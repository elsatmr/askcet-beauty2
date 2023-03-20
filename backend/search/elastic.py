from elasticsearch import Elasticsearch
import os
import sys
import pandas as pd
from search.utils import parse_type, parse_type_type

class ElasticConnect(object):

    def __init__(self, addr: str, username: str, password: str, ca_certs: str):
        """
        data_loader: DataLoader Instance
        """
        self.address = addr
        self.username = username
        self.password = password
        self.ca_certs = ca_certs
        self.connect()

    def connect(self):
        # Create Elasticsearch Instance with the provided credentials
        self.client = Elasticsearch(
                self.address,
                ca_certs=self.ca_certs,
                basic_auth=(self.username, self.password),
                verify_certs=False
            )
        try:
            self.client.info()
        except Exception as e:
            print(e)
            print("Elastic is not connected")
            print("Exit...")
            sys.exit(1)

    def populate_data_from_csv(self, index: str, file_path: str, force_new=True):
        """Parse and Load data from file to elasticsearch"""
        if not os.path.isfile(file_path):
            print(f"Can't find file: {file_path}")
            return

        # Delete index
        if force_new and self.client.indices.exists(index=index):
            self.client.indices.delete(index=index)

        # Create new index if it doesn't exists
        if not self.client.indices.exists(index=index):
            self.client.indices.create(index=index)

        self.client.indices.refresh(index=index)

        # Load the dataset
        df = pd.read_csv(file_path)

        # for type parsing
        df_types = {k: parse_type_type(v) for k, v in df.dtypes.to_dict().items()}
        n = df.shape[0]
        for i, row in df.iterrows():
            print(f"Working on row {i+1}/{n}", end="\r")
            doc = row.to_dict()

            # parsing type before storing the data
            doc = {k: parse_type(v, df_types[k]) for k, v in doc.items()}

            # Index document
            self.client.index(index=index, document=doc)

        print()
        return