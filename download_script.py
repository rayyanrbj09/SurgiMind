# -*- coding: utf-8 -*-
"""
Download CholecTrack20 Dataset
author: Chinedu I. Nwoye
"""     
import requests
import synapseutils
import synapseclient


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
    print("Downloading dataset...")
    _ = synapseutils.syncFromSynapse(syn, entity=entity_id, path=local_folder)
    print("success!")


if __name__ == "__main__":

    # Configuration (Please complete these values and run the code)

    email = "rayyan.rna312@gmail.com" # Your email address in the Synapse account
    authToken = "eyJ0eXAiOiJKV1QiLCJraWQiOiJXN05OOldMSlQ6SjVSSzpMN1RMOlQ3TDc6M1ZYNjpKRU9VOjY0NFI6VTNJWDo1S1oyOjdaQ0s6RlBUSCIsImFsZyI6IlJTMjU2In0.eyJhY2Nlc3MiOnsic2NvcGUiOlsidmlldyIsImRvd25sb2FkIiwibW9kaWZ5Il0sIm9pZGNfY2xhaW1zIjp7fX0sInRva2VuX3R5cGUiOiJQRVJTT05BTF9BQ0NFU1NfVE9LRU4iLCJpc3MiOiJodHRwczovL3JlcG8tcHJvZC5wcm9kLnNhZ2ViYXNlLm9yZy9hdXRoL3YxIiwiYXVkIjoiMCIsIm5iZiI6MTc1ODM2NjU2MywiaWF0IjoxNzU4MzY2NTYzLCJqdGkiOiIyNjE1OSIsInN1YiI6IjM1NTczMTYifQ.tg9KOGGjeznOZ5FeUXxcfcNvvNzJ4XWTwO3fukcVP0HHcTpcdQLsCIO0QjP5v3-ditHTdQW5LYrx3YMnRCMLIl6RtGMbmpHDujDinDS3X4Q2PazCjpHNeV-Y7DtbBOX7innudQjamKkRgZF-Mq57678LbrRe0U16oTvMxYXWhluzBcqhThFQgeJBdmtCmyIS_1aHuk3vfmLhXLxNgQb7AtU89CNAQCANZtzR0UmAopTye7dhF8QPjCJritcAQEafN4B3Svxu8I8juBY2C8ANaFL3eygNcI4-dNu1edHhWoREpXQF4waqE8Ra0rewqfkfwE0kjA1c1pFsnWdYyRxbeQ" # Your authToken from Synapse account
    accesskey = " EEDJTFS.1903270" # Your dataset access key ID
    local_folder = "D:/SurgiMind/data/raw" # Your local folder for the downloaded data

    main()