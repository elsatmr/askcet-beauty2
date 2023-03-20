# ASKCET
Estée Lauder Hackaton


## Python Environment

Create new virtual environment: `python -m venv venv`. This command will create a new python environment directory called `venv`.

Activate new environment:
 * On mac: `source venv/bin/activate`
 * On windows: `.\venv\Scripts\activate`
 
Install required packages: `pip install -r requirements.txt`

Install ffmpeg: `brew install ffmpeg`

## ElasticSearch

Not necessary because the elasticsearch service has been deployed to EC2 server.

#### Connect to SSH
run `./run_aws.sh {ADDRESS}`

#### Start ElasticSearch
To start, log in via SSH and run `sudo systemctl start elasticsearch.service` on a separate screen: `screen -S elastic`

#### Installation
##### Install Java
Install Java on EC2 (Amazon AMI): `sudo yum install java-1.8.0-openjdk`

##### Installation steps
Follow: https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html

on `/etc/elasticsearch/elasticsearch.yml`, add `network.host: 0.0.0.0`. 

##### Download http_ca.crt
Run `sudo cp /etc/elasticsearch/certs/http_ca.crt /path/to/~`
and run `sudo chmod 777 http_ca.crt` so it can be downloaded locally. 

Download locally by running `./download_ca_certs.sh` under search directory.

## Credential
At `.env`

