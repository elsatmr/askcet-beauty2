import re
import string
from nltk.corpus import stopwords

class Preprocess:

    def __init__(self):
        self.english_stopwords = stopwords.words("english")

    def clean_text(self, text):
        '''
        Input:
            text: a string containing a text.
        Output:
            message_cleaned: a processed text. 

        '''

        # Convert words into lower case
        text_cleaned = text.lower()
        
        # Remove links
        text_cleaned = re.sub(r"http\S+", "", text_cleaned)
        text_cleaned = re.sub(r"www.\S+", "", text_cleaned)

        # Remove punctuations
        text_cleaned = "".join([char for char in text_cleaned if char not in string.punctuation])

        # Remove stopwords
        text_cleaned = " ".join([word for word in re.split('\W+', text_cleaned) if word not in self.english_stopwords])

        return text_cleaned


class SearchEngine(object):

    def __init__(self, elastic_instance) -> None:
        self.elastic = elastic_instance
        self.preprocess = Preprocess()

    def search(self, query, index):
        clean_query = self.preprocess.clean_text(query)
        results = self.elastic.client.search(
            index=index,
            query={
                "bool": {
                    "must": [
                        {
                            "match": {
                                "search_name": {"query": clean_query}
                            }
                        },
                        {
                            "match": {
                                "brand": {"query": clean_query}
                            }
                        }
                    ],
                    "should":
                    [
                        {
                            "match": {
                                "search_name": {"query": clean_query}
                            }
                        },
                        {
                            "match": {
                                "brand": {"query": clean_query}
                            }
                        },
                        {
                            "match": {
                                "details": {"query": clean_query}
                            }
                        }
                    ]
                }
            },
            size=1
        )
        try:
            result = [result["_source"] for result in results["hits"]["hits"]][0]
        except:
            result = {}
        return result