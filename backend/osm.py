import requests

url = "https://query.openstreetmap.org/query-features"

headers = {
  'authority': 'query.openstreetmap.org',
  'accept': '*/*',
  'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'origin': 'https://www.openstreetmap.org',
  'referer': 'https://www.openstreetmap.org/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'sec-gpc': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
}


def query_features(lat, long, dist = 10.0):
  payload = {
    'data': f'[timeout:10][out:json];(way["highway"~"motorway|trunk|primary|secondary|tertiary|residential|unclassified"](around:{dist},{lat},{long})->.w1;node(w.w1););out;'
  }
  response = requests.request("POST", url, headers=headers, data=payload)
  return response.text


def get_ways(node_id: str):
  response = requests.request("GET", f'https://www.openstreetmap.org/api/0.6/node/{node_id}/ways.json',  headers=headers)
  return response.text


def get_nodes(way_id: str):
  response = requests.request("GET", f'https://www.openstreetmap.org/api/0.6/way/{way_id}/full.json', headers=headers)
  return response.text


def get_node_geom(node_ids: [str]):
  payload = {
    'data': f'[timeout:10][out:json];node(id:{",".join(node_ids)});way["highway"~"motorway|trunk|primary|secondary|tertiary|residential|unclassified"](bn);out geom;'
  }
  response = requests.request("POST", url, headers=headers, data=payload)
  return response.text
