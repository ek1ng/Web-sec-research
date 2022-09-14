FROM python:3-alpine

WORKDIR /app

COPY backend/ ./
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && pip install -r requirements.txt

ENTRYPOINT [ "python", "app.py" ]