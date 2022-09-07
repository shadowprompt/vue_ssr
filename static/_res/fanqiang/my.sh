#!/bin/sh -e
#copyright by monlor
   
clear
logsh() {
	# 输出信息到/tmp/messages和标准输出
	logger -s -p 1 -t "$1" "$2"
	return 0
	 
} 

logsh "【Tools】" "安装工具箱文件"
mbroot="/etc"
mbtmp="/tmp/mbtmp"
# 安装工具箱文件
cp -rf ${mbtmp}/mixbox ${mbroot}
chmod -R +x ${mbroot}/*
[ "${mbroot}" != "/etc/mixbox" ] && ln -s ${mbroot} /etc/mixbox

## for ubuntu
if uname -v | grep "Ubuntu" &> /dev/null; then
	logsh "【Tools】" "正在切换默认Shell为bash，请输入no！"
	dpkg-reconfigure dash
fi   

logsh "【Tools】" "初始化工具箱配置信息..."
mkdir ${mbroot}/mbdb
mkdir ${mbroot}/var
mkdir ${mbroot}/var/log 
mkdir ${mbroot}/var/run
touch ${mbroot}/config/applist.txt #初始化插件列表
cat ${mbroot}/config/mixbox.uci| while read line; do
    [ -z "$line" ] && continue
    ucikey="$(echo $line | cut -d'=' -f1)"
    ucivalue="$(echo $line | cut -d'=' -f2 | sed -e 's/\"//g')"
    ${mbroot}/bin/mbdb set mixbox.main."$ucikey"="$ucivalue"
done
${mbroot}/bin/mbdb set mixbox.main.mbdisk="${mbdisk}"
${mbroot}/bin/mbdb set mixbox.main.path="${mbroot}"
${mbroot}/bin/mbdb set mixbox.main.url="${mburl}"
${mbroot}/bin/mbdb set mixbox.main.model="${model}"

logsh "【Tools】" "执行工具箱初始化脚本..."
kill -9 $(echo $(ps | grep mixbox/| grep -v grep | awk '{print$1}')) > /dev/null 2>&1
${mbroot}/scripts/init.sh
rm -rf ${mbtmp}/mixbox.zip
rm -rf ${mbtmp}/mixbox
logsh "【Tools】" "工具箱安装完成!"

logsh "【Tools】" "运行mixbox命令即可配置工具箱"
rm -rf ${mbtmp}/install.sh
