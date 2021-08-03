import os
import logging
import sys
from logging.handlers import RotatingFileHandler

from server.settings import LOG_DIR, LOG_ERR_OUT, LOG_INFO_OUT
from server.utils.common import get_pid


class CustomFormatter(logging.Formatter):
    """Logging Formatter to add colors and count warning / errors"""

    grey = "\x1b[38;21m"
    yellow = "\x1b[33;21m"
    red = "\x1b[31;21m"
    bold_red = "\x1b[31;1m"
    reset = "\x1b[0m"
    format = '%(asctime)s::%(name)-15s %(levelname)-5s [%(filename)s:%(lineno)d] :: %(message)s'

    FORMATS = {
        logging.DEBUG: grey + format + reset,
        logging.INFO: grey + format + reset,
        logging.WARNING: yellow + format + reset,
        logging.ERROR: red + format + reset,
        logging.CRITICAL: bold_red + format + reset
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)


class WisdomMlLogger:
    def __init__(self, label, log_info_file, log_err_file):
        logger = logging.getLogger(label)
        logger.setLevel(logging.DEBUG)

        # create formatter and add it to the handlers
        self.formatter = CustomFormatter()

        self.log_info_file = log_info_file
        self.log_err_file = log_err_file

    @staticmethod
    def get_console_handler(formatter):
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(formatter)
        return console_handler

    @staticmethod
    def get_file_handler(log_info_file, log_err_file, formatter):
        # create console handler with a higher log level
        f_info_handler = RotatingFileHandler(log_info_file, maxBytes=5 * 1024 * 1024, backupCount=4)
        f_info_handler.setLevel(logging.INFO)
        f_info_handler.setFormatter(formatter)

        f_err_handler = RotatingFileHandler(log_err_file, maxBytes=5 * 1024 * 1024, backupCount=4)
        f_err_handler.setLevel(logging.ERROR)
        f_err_handler.setFormatter(formatter)

        return f_info_handler, f_err_handler

    def init_logger(self, logger_name):
        # Note: Loggers are never instantiated directly, but always through the module-level function
        # logging.getLogger(name). Multiple calls to getLogger() with the same name will always
        # return a reference to the same Logger object.
        logger = logging.getLogger(logger_name)
        logger.setLevel(logging.DEBUG)  # better to have too much log than not enough
        logger.handlers = []

        logger.addHandler(self.get_console_handler(self.formatter))
        fh_info, fh_err = self.get_file_handler(self.log_info_file, self.log_err_file, self.formatter)
        logger.addHandler(fh_info)
        logger.addHandler(fh_err)

        return logger


def get_logger(label, log_info_file=LOG_INFO_OUT, log_err_file=LOG_ERR_OUT):
    log_info_file = log_info_file.replace('<PID>', get_pid())
    log_err_file = log_err_file.replace('<PID>', get_pid())

    return WisdomMlLogger(label=label.upper(),
                          log_info_file=os.path.join(LOG_DIR, log_info_file),
                          log_err_file=os.path.join(LOG_DIR, log_err_file)).init_logger(logger_name=label)


def release_logger(logger):
    handlers = logger.handlers
    for handler in handlers:
        handler.close()
        logger.removeHandler(handler)

    filters = logger.filters
    for flt in filters:
        logger.removeFilter(flt)

    logging.shutdown()
