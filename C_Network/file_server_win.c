/*
 * file_server_win.c
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#define BUFSIZE 1000
void ErrorHandling(char *message);
void err_quit(char *msg);
void err_display(char *msg);

int main(int argc, char **argv)
{
	WSADATA  wsaData;
	SOCKET   hServSock;
	SOCKET   hClntSock;
	char buf[BUFSIZE];
	
	FILE* fp;
	SOCKADDR_IN servAddr;
	SOCKADDR_IN clntAddr;
	int clntAddrSize;
	int len,n;
	int totalLen =0;
	
	if(argc!=2){
		printf("Usage : %s <port>\n", argv[0]);
		exit(1);
	}
	
	printf("Server Runinng ...\n");
	
	/* 접속해오는 클라이언트에게 전송해 줄 파일 오픈  */
	fp = fopen("zipcode.txt", "w");
	if(fp == NULL)
		ErrorHandling("File open error");
	
	if(WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
		ErrorHandling("WSAStartup() error!");
	
	hServSock=socket(PF_INET, SOCK_STREAM, 0);   
	if(hServSock == INVALID_SOCKET)
		ErrorHandling("socket() error");
	
	memset(&servAddr, 0, sizeof(servAddr));
	servAddr.sin_family=AF_INET;
	servAddr.sin_addr.s_addr=htonl(INADDR_ANY);
	servAddr.sin_port=htons(atoi(argv[1]));
	
	if( bind(hServSock, (SOCKADDR*) &servAddr, sizeof(servAddr))==SOCKET_ERROR )
		ErrorHandling("bind() error");
	
	if( listen(hServSock, 5)==SOCKET_ERROR )
		ErrorHandling("listen() error");
	
	clntAddrSize=sizeof(clntAddr);    
	hClntSock=accept(hServSock, (SOCKADDR*)&clntAddr,&clntAddrSize);
	if(hClntSock==INVALID_SOCKET)
		ErrorHandling("accept() error");
	
	
	memset(buf, 0, BUFSIZE);
	/* 클라이언트에 데이터 수신  */
	while( (len=recv(hClntSock, buf, BUFSIZE, 0)) != 0 )
	{
		if(len == SOCKET_ERROR){
			err_display("Error! recv()\n");
		} 
		n = fwrite(buf, sizeof(char), len, fp); 
		totalLen += n;
	}
	printf("Total bytes of recv = %d\n",totalLen);
	
	
	fclose(fp);
	closesocket(hClntSock);
	
	WSACleanup();
	system("PAUSE");
	return 0;
}

void ErrorHandling(char *message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);
}
// 소켓 함수 오류 출력 후 종료
void err_quit(char *msg)
{
	LPVOID lpMsgBuf;
	FormatMessage(
		FORMAT_MESSAGE_ALLOCATE_BUFFER|FORMAT_MESSAGE_FROM_SYSTEM,
		NULL, WSAGetLastError(),
		MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
		(LPTSTR)&lpMsgBuf, 0, NULL);
	MessageBox(NULL, (LPCTSTR)lpMsgBuf, msg, MB_ICONERROR);
	LocalFree(lpMsgBuf);
	exit(1);
}

// 소켓 함수 오류 출력
void err_display(char *msg)
{
	LPVOID lpMsgBuf;
	FormatMessage(
		FORMAT_MESSAGE_ALLOCATE_BUFFER|FORMAT_MESSAGE_FROM_SYSTEM,
		NULL, WSAGetLastError(),
		MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
		(LPTSTR)&lpMsgBuf, 0, NULL);
	printf("[%s] %s", msg, (char *)lpMsgBuf);
	LocalFree(lpMsgBuf);
}
