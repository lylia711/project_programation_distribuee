FROM python:3
ENV PYTHONUNBUFFERED 1

# COPY . /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . ./
EXPOSE 8000