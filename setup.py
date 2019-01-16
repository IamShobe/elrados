"""Setup file for handling packaging and distribution."""
import sys

from setuptools import setup, find_packages

__version__ = "0.6.1"

requirements = [
    'django>=1.8,<1.9',
    'twisted',
    'crochet',
    'autobahn',
    'rotest>=5.5.0',
]

setup(
    name='elrados',
    version=__version__,
    description="Frontend for django models and Rotest Testing Framework",
    license="MIT",
    author="Elran Shefer",
    author_email="elran777@gmail.com",
    url="https://github.com/IamShobe/elrados",
    keywords="rotest frontend",
    install_requires=requirements,
    python_requires="~=2.7.0",
    packages=find_packages("src"),
    package_dir={"": "src"},
    package_data={"elrados": ["static/*",
                              "static/img/*",
                              "static/font/*",
                              "templates/*"]},
    zip_safe=False,
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 2.7',
        'Operating System :: Microsoft :: Windows',
        'Operating System :: POSIX',
        'Operating System :: Unix',
        'Operating System :: MacOS',
        ],
    entry_points={
        "rotest.cli_server_actions":
            ["elrados_server = elrados.backend.main:setup_server"],
    },
)
