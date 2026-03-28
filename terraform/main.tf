provider "aws" {
  region = "ap-south-1"
}

# Security Group
resource "aws_security_group" "devsec_sg" {
  name        = "devsec-security-group"
  description = "Security group for DevSec pipeline"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 30007
    to_port     = 30007
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "devsec_server" {
  ami           = "ami-0f5ee92e2d63afc18" # Ubuntu
  instance_type = "m7i-flex.large"

  key_name = "devsec-key"

  vpc_security_group_ids = [aws_security_group.devsec_sg.id]

  # Storage (40GB)
  root_block_device {
    volume_size = 40
    volume_type = "gp3"
  }

  tags = {
    Name = "devsec-pipeline-server"
  }
}

# Elastic IP
resource "aws_eip" "devsec_eip" {
  instance = aws_instance.devsec_server.id
}