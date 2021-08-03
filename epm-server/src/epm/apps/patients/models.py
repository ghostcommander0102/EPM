from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


# ---------------- Abstract models ---------------- #
class AbstractProfile(models.Model):
    MALE = 'male'
    FEMALE = 'female'
    OTHER = 'other'
    NOT_FILLED = ''

    CONTACT_STATUS_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
        (NOT_FILLED, '')
    ]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True, default="")
    date_of_birth = models.DateField(null=True)
    sex = models.CharField(
        max_length=50, choices=CONTACT_STATUS_CHOICES, blank=True, default=NOT_FILLED)
    email = models.CharField(max_length=50, blank=True, default="")
    ssn = models.CharField(max_length=255, blank=True, default="")
    address = models.CharField(max_length=255, blank=True, default="")
    city = models.CharField(max_length=255, blank=True, default="")
    state = models.CharField(max_length=255, blank=True, default="")
    county = models.CharField(max_length=255, blank=True, default="")
    zip = models.CharField(max_length=255, blank=True, default="")
    phone_home = models.CharField(max_length=255, blank=True, default="")
    phone_work = models.CharField(max_length=255, blank=True, default="")
    phone_cell = models.CharField(max_length=255, blank=True, default="")
    signature = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.first_name

    class Meta:
        abstract = True


class AbstractInformation(models.Model):
    race = models.CharField(max_length=50, blank=True, default="")
    marital = models.CharField(max_length=50, blank=True, default="")
    language = models.CharField(max_length=50, blank=True, default="")
    pcp_facility_name = models.CharField(
        max_length=50, blank=True, default="")  # pcp: Primary Care Physician
    pcp_facility_address = models.CharField(
        max_length=255, blank=True, default="")
    pcp_facility_city = models.CharField(
        max_length=255, blank=True, default="")
    pcp_facility_state = models.CharField(
        max_length=255, blank=True, default="")
    pcp_facility_zip = models.CharField(max_length=50, blank=True, default="")
    pcp_name = models.CharField(max_length=50, blank=True, default="")
    pcp_phone = models.CharField(max_length=50, blank=True, default="")
    statement_receiver_name = models.CharField(
        max_length=50, blank=True, default="")
    statement_receiver_address = models.CharField(
        max_length=255, blank=True, default="")
    statement_receiver_city = models.CharField(
        max_length=255, blank=True, default="")
    statement_receiver_zip = models.CharField(
        max_length=50, blank=True, default="")
    statement_receiver_phone = models.CharField(
        max_length=50, blank=True, default="")
    emergency_contactor_name = models.CharField(
        max_length=50, blank=True, default="")
    emergency_contactor_phone = models.CharField(
        max_length=50, blank=True, default="")
    employer_name = models.CharField(max_length=50, blank=True, default="")
    employer_occupation = models.CharField(
        max_length=255, blank=True, default="")
    employer_phone = models.CharField(max_length=50, blank=True, default="")
    referred_by = models.CharField(max_length=50, blank=True, default="")

    class Meta:
        abstract = True


class AbstractConsentForm(models.Model):
    document_file = models.TextField(blank=True, default="")
    consent_form = models.JSONField(null=True)

    class Meta:
        abstract = True


# ---------------- Real models ---------------- #
class ProfileTemp(AbstractProfile):
    reviewed = models.BooleanField(default=False)

    class Meta:
        db_table = 'patients_profile_temp'


class InformationTemp(AbstractInformation):
    profile_temp = models.OneToOneField(
        ProfileTemp, on_delete=models.CASCADE, related_name='information_temp')

    class Meta:
        db_table = 'patients_information_temp'


class ConsentFormTemp(AbstractConsentForm):
    profile_temp = models.OneToOneField(
        ProfileTemp, on_delete=models.CASCADE, related_name='consent_form_temp')

    class Meta:
        db_table = 'patients_consent_form_temp'


class Profile(AbstractProfile):
    pass


class Information(AbstractInformation):
    profile = models.OneToOneField(
        Profile, on_delete=models.CASCADE, related_name='information')


class ConsentForm(AbstractConsentForm):
    profile = models.OneToOneField(
        Profile, on_delete=models.CASCADE, related_name='consent_form')

    class Meta:
        db_table = 'patients_consent_form'


# ---------- Create/Save InformationTemp, ConsentFormTemp object(record) when ProfileTemp is created ---------- #
@receiver(post_save, sender=ProfileTemp)
def create_information_temp(sender, instance, created, **kwargs):
    if created:
        InformationTemp.objects.create(profile_temp=instance)


@receiver(post_save, sender=ProfileTemp)
def save_information_temp(sender, instance, **kwargs):
    instance.information_temp.save()


@receiver(post_save, sender=ProfileTemp)
def create_consent_form_temp(sender, instance, created, **kwargs):
    if created:
        ConsentFormTemp.objects.create(profile_temp=instance)


@receiver(post_save, sender=ProfileTemp)
def save_consent_form_temp(sender, instance, **kwargs):
    instance.consent_form_temp.save()


# ---------- Create/Save Information, ConsentForm object(record) when Profile is created ---------- #
@receiver(post_save, sender=Profile)
def create_information(sender, instance, created, **kwargs):
    if created:
        Information.objects.create(profile=instance)


@receiver(post_save, sender=Profile)
def save_information(sender, instance, **kwargs):
    instance.information.save()


@receiver(post_save, sender=Profile)
def create_consent_form(sender, instance, created, **kwargs):
    if created:
        ConsentForm.objects.create(profile=instance)


@receiver(post_save, sender=Profile)
def save_consent_form(sender, instance, **kwargs):
    instance.consent_form.save()
