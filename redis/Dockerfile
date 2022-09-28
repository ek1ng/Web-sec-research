FROM ubuntu:latest

RUN sed -i 's/cn.archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

# install & configure ssh
RUN echo root:8pFS94ATkdey9nqh | chpasswd
RUN apt update && apt install openssh-server redis-server -y
RUN echo -e 'y\n' | ssh-keygen -f $HOME/.ssh/id_rsa -t rsa -N '' && sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
ADD ./start.sh /start.sh
RUN chmod +x /start.sh
RUN service ssh start

CMD [ "/start.sh" ]
