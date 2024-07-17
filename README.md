# AWS EC2 for Node.js: A Detailed Guide to Deployment, Environment Variables, and SSL Setup

- EC2 `(Elastic Compute Cloud)` is a service provided by Amazon AWS that allow users to rent virtual computers on which to run their own computer applications.
- EC2 instances can be configured with various operating systems, CPU, memory, storage, and networking capacities, providing a flexible and scalable computing environment.

### How to Deploy Node.js Application on AWS EC2:

1. **Launch an AWS EC2 instance:** An AWS EC2 instance is essentially a virtual server hosted in the cloud by Amazon Web Services (AWS). It provides the capability to deploy and run applications on AWS infrastructure without the need for physical hardware investments.
    
    First of all launch an  AWS EC2 instance:
    
    - Create an account on [AWS](https://aws.amazon.com/) and then search the service EC2.
    - Then click on launch instance.
    
    ![Screenshot 2024-07-17 025030](https://github.com/user-attachments/assets/3b1fa141-7610-4196-8251-dff15e73a654)
    
    - Enter a name for your server (e.g., test2-server) and select Ubuntu as the AMI (Amazon Machine Image), which contains the software configuration required to launch your instance.
    
    ![Screenshot 2024-07-17 030348](https://github.com/user-attachments/assets/d8731e95-a8f6-4dec-8e7a-ee353a6bc9d3)
    
    - Select the instance type (e.g., t2.micro for free tier usage).
    
    ![Screenshot 2024-07-17 030400](https://github.com/user-attachments/assets/22ed5068-84f0-4fca-b691-3513f01f2af2)
    
    - Generate a key pair with configurations that will help you connect to your instance. Download and save the key pair securely.
    
    ![Screenshot 2024-07-17 031113](https://github.com/user-attachments/assets/a0380e3d-b058-495b-a66f-973d604de53e)
    
    - Create a security group with necessary configurations.
    
   ![Screenshot 2024-07-17 031237](https://github.com/user-attachments/assets/360336e5-69b1-435a-9bb9-bcade64acdfc)
    
    - Configure storage (e.g., 12GB).
    
   ![Screenshot 2024-07-17 031456](https://github.com/user-attachments/assets/6edfcfb5-660d-4098-b2d8-98eb3927bd63)
    
    - Click on "Launch instance". After launching, wait for it to initialize and pass all status checks.
        
    ---
    
    - Edit security groups. Click on your launched instance, scroll down, click on "Security", and then on the link below "Security Groups".
   ![Screenshot 2024-07-17 032836](https://github.com/user-attachments/assets/ee626ebf-eeee-412c-990a-0ea61abc68fe)
    
    - Click on "Edit inbound rules".
    
    ![Screenshot 2024-07-17 032939](https://github.com/user-attachments/assets/cb300567-ee13-4385-908e-5e0406a6e39e)
    
    - Add the required protocols.
    
    ![Screenshot 2024-07-17 033239](https://github.com/user-attachments/assets/b1d45b24-1fbe-4fc3-92df-dd5f17de2629)
    
    ---
    
    1. **Connect with your instance:**  
        - Once your instance is launched successfully, connect it to your local terminal.
        - Click on the instance you want to connect to, then click on the "Connect" button.
        
        ![Screenshot 2024-07-17 034042](https://github.com/user-attachments/assets/3581f3a2-59d2-4c69-96ee-31cef551a6d2)
        
        - Copy the public DNS from the SSH client.
        
        ![Screenshot 2024-07-17 034211](https://github.com/user-attachments/assets/f49245ff-7220-4553-ae60-591ee23567ef)
        
        ---
        
        - In your terminal, navigate to the directory where your key pair is stored (e.g., Downloads folder).
        
        ![Screenshot 2024-07-17 034437](https://github.com/user-attachments/assets/cab0bc86-7667-4747-b0f5-64b42a9244db)
        
        - Paste and execute the copied command, and answer "yes" to any questions asked.
        
        ```jsx
        ssh -i "test2-server.pem" ubuntu@ec2-15-206-116-198.ap-south-1.compute.amazonaws.com
        
        ```
        
        ![Screenshot 2024-07-17 034833](https://github.com/user-attachments/assets/6a5703e3-1772-4fec-a6be-14e57051dfaa)
        
        - This will successfully connect you to your EC2 instance.
        
        ![Screenshot 2024-07-17 035418](https://github.com/user-attachments/assets/de2442c8-473f-486b-b9ee-e3465d1a5430)
        
        - Now, let’s move to the final and the most important step.
        
        ---
        
        1. **Final Setup:**
        - **Update and Upgrade Linux machine and install node and NVM.**
        
        ```jsx
        sudo apt update
        ```
        
        ```jsx
        sudo apt upgrade
        ```
        
        - Install `git`.
        
        ```jsx
        sudo apt install -y git 
        ```
        
        - Install Node.
        
        ```jsx
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        ```
        
        - Now, reload the bash configuration by executing the following command.
        
        ```jsx
        source ~/.bashrc
        ```
        
        - Install `npm`.
        
        ```jsx
        sudo apt install npm
        ```
        
        - Confirm the successful install of `npm` by running the following command:
        
        ```jsx
        npm --version
        ```
        
        - If you are getting your `npm` version on executing the above command, it means `npm` is installed successfully on your system.
        
        ![Screenshot 2024-07-17 041730](https://github.com/user-attachments/assets/0e4a118c-f4aa-4937-b082-b2b158554600)
        
        ---
        
        1. **Generate SSH Key and connect with GitHub** :
        - Execute the following command to generate a SSH key that will help to connect to your GitHub. Copy the generated SSH key and open your GitHub account.
        
        ```jsx
        ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
        ```
        
        - Copy the generated SSH key by running the following command.
        
        ```jsx
        cat ~/.ssh/id_rsa.pub
        
        ```
        
        - Output of above command will be something like this. Copy the generated SSH key (complete key).
        
        ```jsx
        ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC7e7aDOk4w+Km9zc2m1p4Z+wFqPV2ngsc1nfaCLzR/
        uuugy+ABaz9znf+p9uFAAms7LY9iCHn51Kje3bUiE+NPXlcIIo/68nUbKjC5CqcxTN+bP1GEwv/tgiwvBFU2OS2tgm
        /4O2TTgyG2bSOFyiPf0zCdc1KlTD+d3FfspckU1miaZ0NCadgzHrdEMNPw+FzWamexAvGwljKaP6X
        jTWNtFDSpF/yD2FzVC7u5gXIDqsGGjXE4fHCeJ4qOmJZmj9sI76x3iq4n11ROv6BfatAItna0kU+i
        MkikEJCAM2P+OiOuHVDEXgEUNL8Hqq541rktrJ8b4eiRqKaI6drixPDv/JdHOUSA4/3wSOlJbK2l5D
        g+la3qI4qBGY5EnZt4aBOYXDMUM/3bPL898JmnfCK1JoT+UMclkHa2rSOxZezUNRKtVJAPGlHFCgn+
        72QFHrezywMtAlXdYnbMMEMvXpP1Hwj2SiQGHmP3fzrVHH92wCoEBPCr129pYCCYG5YdAbOPgfzY6zD
        L1C6ovwzr9XAG0+moJXudnfHd6808Pc3dcnpeFQdN4jKp3fpUv626yYk4uq1c+qmH8zXQNo1PIyT6+Jpl
        SNb/8/YgvvhLxpvp6YsegKeN8Jp7ujEtZyeGGDwihcbJID5mE7W8Mze8B8cMhgVOLDI6YmvH/FGlf
        dQ+JQ== satyamsingh748846@gmail.com
        ```
        
        - Now, add the above SSH key to your GitHub account. Go to GitHub, click on your profile and then click on settings. Then click on SSH and GPG keys. Click new SSH key. Paste the copied key and click on save button.
        - After adding, it will look something like this.
        
        ![Screenshot 2024-07-17 044200](https://github.com/user-attachments/assets/f0fc34a3-52e8-48df-9844-6f4145760793)
        
        - Test the SSH connection to GitHub:
        
        ```
        ssh -T git@github.com
        ```
        
        - It will show something like this:
        
        ![Screenshot 2024-07-17 044503](https://github.com/user-attachments/assets/5b278713-1cfc-44bf-bbc5-82014067cb5f)
        
        - Now, copy the SSH key of the GitHub repo that you want to deploy.
        
        ![Screenshot 2024-07-17 044642](https://github.com/user-attachments/assets/c3e2a31a-a823-4976-b3b9-7e154ebce66b)
        
        - Now, in the terminal that is connected to your ec2 instance run the following command
        
        ```jsx
        git clone git@github.com:SATYAM1000/deploy-on-ec2.git
        // replace with your repo SSH key
        ```
        
        - After cloning the GitHub repo that you want to clone, navigate to that directory.
        
        ```jsx
        cd repository-name
        //In my case: cd deploy-on-ec2
        //replace with your directory name
        ```
        
        - Now, run the following commands.
        
        ```jsx
        npm install
        npm start
        ```
        
        - This will start running your application. If you are environment variables error then follow the below given steps to set environment variables.
        1. **Set Environment Variables Using Nano text editor:**
        - Inside your cloned repo, create a `.env` file by running following command. Nano is a simple text editor that is commonly available on Unix-like systems.
        
        ```jsx
        nano .env
        ```
        
        - Nano will open the `.env` file in the terminal window. Add your environment variables in the format `KEY=VALUE`, each on a new line. For example:
        
        ![Screenshot 2024-07-17 045901](https://github.com/user-attachments/assets/a445ab35-9655-41f1-84e6-45589cc90fb0)
        
        - Now, save and exit.
        
        <aside>
        💡
        
        1. To save the changes and exit Nano: Press `Ctrl + O` (to write Out).Press `Enter` to confirm the filename. Press `Ctrl + X` to exit Nano.
        </aside>
        
        ---
        
        1. **Setting the environment variables using Vim text editor (Choose any one Nano or Vim):**
        - Vim is another text editor available on most Unix-like systems. Here’s how you can create or edit a `.env` file using Vim:
        - If the `.env` file already exists, open it with Vim. If the file doesn't exist, Vim will create it when you save.
        
        ```jsx
        vim .env
        ```
        
        - Vim will open the `.env` file. Press `i` to enter insert mode and add your environment variables:
        
        ```jsx
        DATABASE_URL=mongodb://username:password@host:port/database
        PORT=3000
        ```
        
        - Save and exit:
            - Press `Esc` to exit insert mode (if you're still in it).
            - Type `:wq` and press `Enter` to write (save) and quit Vim.
        
        ---
        
        - To view Environment variables in terminal, write the following command:
        
        ```jsx
        cat .env
        ```
        
        ---
        
        1. **Install PM2:**
        - PM2 (Process Manager 2) is a production process manager for Node.js applications. It provides several features that help manage, monitor, and maintain Node.js applications in production environments.
        
        ```jsx
        sudo npm install pm2 -g
        ```
        
        - Start your application with PM2
        
        ```jsx
        pm2 start app.js
        //Replace app.js with the entry point of your application.
        
        ```
        
        - Save the PM2 process list and set it to restart on reboot:
        
        ```jsx
        pm2 save
        pm2 startup
        ```
        
        ---
        
        1. **Install Nginx web server For Reverse Proxy:**
        
        ```jsx
        sudo apt install nginx
        ```
        
        ```jsx
        sudo nano /etc/nginx/sites-available/default
        ```
        
        - This will open something like this. Clear it and paste the following commands by replacing your own domain name.
        
        ![Screenshot 2024-07-17 052951](https://github.com/user-attachments/assets/95cc2c3d-92d1-418f-ac4f-fd51c5092952)
        
        - Paste following commands by replacing your custom domain name and port number.
        
        ```jsx
        server {
        listen 80;
        # listen 443 ssl http2;
        server_name test2.dokopi.com; // your domain 
        # Include your SSL details here #
        location / {
        proxy_pass http://127.0.0.1:3000; // here replace with your port number
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        add_header X-Cache $upstream_cache_status;
        proxy_connect_timeout 30s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 30s;
        proxy_http_version 1.1;
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        }
        access_log /var/log/nginx/test2.dokopi.com.log; //your domain
        error_log /var/log/nginx/test2.dokopi.com.error.log; //your domain
        }
        ```
        
        - Test nginx configurations by running the following command:
        
        ```jsx
        sudo nginx -t
        ```
        
      ![Screenshot 2024-07-17 053912](https://github.com/user-attachments/assets/72ceb723-e5f0-4072-8eea-547299f44d12)
        
        - Restart nginx by running following command:
        
        ```jsx
        sudo service nginx restart
        ```
        
    
    <aside>
    💡 
    Open a web browser and go to `http://your-ec2-instance-public-dns` or `http://your_domain`.
    
    </aside>
    
    ![Screenshot 2024-07-17 054249](https://github.com/user-attachments/assets/84282d14-25ea-432f-898c-ac9162af2e38)
    
    ---
    
    1. **Add domain in goDaddy.com**
    - If you have domain, you can add A record to your EC2 instance IP with a new subdomain. Go to [godaddy.com](http://godaddy.com) and then select your domain and then click on DNS and then add record. Create a new record.
    
    ![Screenshot 2024-07-17 054723](https://github.com/user-attachments/assets/5725f4cb-9a09-4d71-b8c0-fea4debaa564)
    
    - It will take some time to connect your application with your domain.
    
    ---
    
    1. **Installing Free SSL**
- Install certbot

```jsx
//run following commands one by one
sudo apt-get install snapd
sudo snap install core;
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

```

```jsx
sudo certbot --nginx
```

- It will ask some question. Answer all the question.

  ![Screenshot 2024-07-17 055801](https://github.com/user-attachments/assets/490257b3-e31f-4833-9a96-ddd39264f286)

- **`Verifying Certbot Auto-Renewal`**

```jsx
sudo systemctl status snap.certbot.renew.service
```

---

1.  **Visit your website HTTPS://**
- Enjoy Your free Nodejs server with Free SSL :)
