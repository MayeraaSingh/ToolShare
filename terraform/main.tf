provider "aws" {
  region = "ap-south-1"
}

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
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5173
    to_port     = 5173
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

resource "aws_instance" "devsec_server" {
  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t3.small"

  key_name = "devsec-key"

  vpc_security_group_ids = [aws_security_group.devsec_sg.id]

  tags = {
    Name = "devsec-pipeline-server"
  }
}