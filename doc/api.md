# lusca api list

## 1.auth

### login

    url:/api/identity/v3/auth/tokens  
    method:"post"
    body:{
    "auth": {
        "identity": {
            "methods": [
                "password"
            ],
            "password": {
                "user": {
                    "name": "admin",
                    "domain": {
                        "name": "Default"
                    },
                    "password": "admin"
                    }
                }
            }
        }
    }  
    response:{
    "type": "success",
    "items": {
        "token": {
            "issued_at": "2018-03-21T07:40:56.000000Z",
            "audit_ids": [
                "E3YzOjH4RBWuFPCQkfxZcg"
            ],
            "methods": [
                "password"
            ],
            "expires_at": "2018-03-21T08:40:56.000000Z",
            "user": {
                "password_expires_at": null,
                "domain": {
                    "id": "default",
                    "name": "Default"
                },
                "id": "9831161ac0244a2cbbb01f1ed7e60e20",
                "name": "admin"
                }
            }
        }
    }

### loginout

    url:/api/identity/v3/auth/tokens  
    method:"delete"
    response:201
