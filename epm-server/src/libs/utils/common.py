import os
import configparser
from datetime import datetime, timezone


def get_pid():
    pid = os.getpid()
    return str(pid)


def get_now_ts():
    now = datetime.utcnow().replace(tzinfo=timezone.utc)
    return now


def get_now_str():
    now = datetime.utcnow().replace(tzinfo=timezone.utc).timestamp()
    str_now = datetime.fromtimestamp(now, tz=timezone.utc).strftime("%Y_%m_%d-%H_%M_%s")
    return str_now


def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        # raise argparse.ArgumentTypeError('Boolean value expected.')
        return False


def str2list(text):
    text = text.replace(",", " ")
    li = [sp.strip() for sp in text.split() if len(sp.strip()) != 0]
    return li


def txt_file2list(txt_file):
    if not os.path.exists(txt_file):
        return []
    else:
        with open(txt_file) as f:
            content = f.readlines()
            # you may also want to remove whitespace characters like `\n` at the end of each line
            li = [row.strip() for row in content if row.strip() != '']
        return li
