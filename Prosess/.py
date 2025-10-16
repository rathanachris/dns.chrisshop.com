import json, os

cfg = json.load(open('config.json'))
api_token = os.getenv('API_TOKEN', cfg.get('API_TOKEN'))
mode = os.getenv('MODE', cfg.get('MODE', 'development'))

print(f"Token: {api_token[:6]}..., mode: {mode}")
# បន្ថែម logic ប្រើ api_token
