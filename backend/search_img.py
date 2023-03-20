import os
from dotenv import load_dotenv
from google_images_search import GoogleImagesSearch
load_dotenv()

# you can provide API key and CX using arguments,
# or you can set environment variables: GCS_DEVELOPER_KEY, GCS_CX
gis = GoogleImagesSearch(os.environ["GCS_DEVELOPER_KEY"], os.environ["GCS_CX"])

# define search params
# option for commonly used search param are shown below for easy reference.
# For param marked with '##':
#   - Multiselect is currently not feasible. Choose ONE option only
#   - This param can also be omitted from _search_params if you do not wish to define any value
_search_params = {
    'q': 'estee lauder double sephora',
    'num': 2,
    'rights': 'cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial|cc_nonderived',
}

# this will search, download and resize:
gis.search(search_params=_search_params, path_to_dir='./imgs/')