/*
 * file_client_win.c
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
	SOCKET   hSocket;
	
	char buf[BUFSIZE];
	FILE* fp;
	SOCKADDR_IN servAddr;
	int len,n,i;
	int totalLen=0; 
	
	if(argc!=4){
		printf("Usage : %s <IP> <port>\n", argv[0]);
		exit(1);
	}
	
	printf("Client Running ...\n");
	
	//fp = fopen("zipcode.txt", "r");
	fp = fopen(argv[3], "r");
	if(fp == NULL)
		ErrorHandling("File open error");
	
	if(WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
		ErrorHandling("WSAStartup() error!");
	
	/* ���� �������� ���� ���� */
	hSocket=socket(PF_INET, SOCK_STREAM, 0);   
	if(hSocket == INVALID_SOCKET)
		ErrorHandling("socket() error");
	
	memset(&servAddr, 0, sizeof(servAddr));
	servAddr.sin_family=AF_INET;
	servAddr.sin_addr.s_addr=inet_addr(argv[1]);
	servAddr.sin_port=htons(atoi(argv[2]));
	
	for(i=0; i<3; i++){
		// ���ӿ�û  
		if( connect(hSocket, (SOCKADDR*)&servAddr, sizeof(servAddr))==SOCKET_ERROR ){
			//ErrorHandling("connect() error!");
			Sleep(3000);
			if(i==2)
				err_display("Error! connect()\n");
			else
				continue;
			
		}
		break;
	}
		
	
	/* ������ ��Ŷ������ �۽� */
	while(1){	  
		//Ȥ�ó� �� ���۸� ������ ������ ������ �����Ͱ�����ٴ� �� ���� 
		memset(buf,0,BUFSIZE);
		len=fread(buf, sizeof(char), BUFSIZE, fp);
		n = send(hSocket, buf, len, 0);
		
		// �۽� ���� ó�� 
		if(n == SOCKET_ERROR){
			err_display("Error! send()\n");
		}
		totalLen += n;
		
		if(feof(fp)) break;
	}
	printf("Total bytes of Send = %d\n",totalLen);

	fclose(fp);
	closesocket(hSocket);
	WSACleanup();
	return 0;
}

void ErrorHandling(char *message)
{
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);
}
// ���� �Լ� ���� ��� �� ����
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

// ���� �Լ� ���� ���
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
