# -*- coding: utf-8 -*-
"""
Download CholecTrack20 Dataset
author: Chinedu I. Nwoye
Once Downloaded, push the data to your private S3 bucket for further processing.
AWS CLi command to push data to S3 bucket:
aws s3 cp <local_folder> s3://<your_bucket_name>/ --recursive --endpoint-url <your_endpoint_url>
"""     
import requests
import synapseutils
import synapseclient
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv
import os

def main():

    # 1. Login with Synapse credentials
    print("Authenticating user ...")
    syn = synapseclient.login(email=email, authToken=authToken)

    # 2. Request entity access
    print("Authenticating access key permission to download dataset ...")
    API_URL = "https://synapse-response.onrender.com/validate_access"
    USER_ID = syn.getUserProfile()['ownerId']
    response = requests.post(API_URL, json={"access_key": accesskey, "synapse_id": USER_ID})
    if response.status_code == 200:
        entity_id = response.json()['entity_id']
    else:
        print("❌ Failed to request access:", response.text)
        exit(1)

    # 3. Download dataset to your local folder
    with ThreadPoolExecutor(max_workers=1) as executor:
        print("Downloading dataset...")
        _ = synapseutils.syncFromSynapse(syn, entity=entity_id, path=local_folder)
        print("success!")


if __name__ == "__main__":

    load_dotenv()

    # Configuration (Please complete these values and run the code)

    email = os.getenv('email')# Your email address in the Synapse account
    authToken = os.getenv('auth_token')# Your authentication token from Synapse account
    accesskey = os.getenv('acesskey')# Your access key to download the dataset
    local_folder = "./data" # Local folder to save the downloaded dataset

    main()