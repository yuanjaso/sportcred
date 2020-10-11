from setuptools import setup, find_packages

ver = "1.0.0"
setup(
    name="sportscred",
    version=ver,
    description="Sports Cred: E A sports its in the name",
    long_description=("Sports platform to gain credibility"),
    author="Lilypad",
    license="",
    url="",
    packages=find_packages(),
    install_requires=[
        "Django",
        "django-classbasedsettings",
        "django-simple-captcha",
        "djangorestframework",
        "channels",
        "django-filter",
        "djangorestframework-filters",
    ],
    classifiers=["Programming Language :: Python :: 3 :: Only"],
)
