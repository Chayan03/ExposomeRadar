import subprocess
import sys
import os
import signal

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_args = sys.argv[1:]
    
    print("Starting Exposome Radar...")

    # Start FastAPI Backend
    backend_dir = os.path.join(base_dir, "backend")
    if os.name == 'nt':
        uvicorn_path = os.path.join(backend_dir, "venv", "Scripts", "uvicorn.exe")
    else:
        uvicorn_path = os.path.join(backend_dir, "venv", "bin", "uvicorn")
        
    backend_cmd = [uvicorn_path, "main:app"] + backend_args
    
    print("-> Launching Backend...")
    backend_process = subprocess.Popen(backend_cmd, cwd=backend_dir)

    # Start Next.js Frontend
    frontend_dir = os.path.join(base_dir, "frontend")
    frontend_cmd = ["npm", "run", "dev"]
    
    print("-> Launching Frontend...")
    frontend_process = subprocess.Popen(frontend_cmd, cwd=frontend_dir, shell=(os.name == 'nt'))

    try:
        # Wait for both processes to keep the script alive
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\nShutting down Exposome Radar...")
        backend_process.terminate()
        frontend_process.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
