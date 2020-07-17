from enum import Enum

class FriendsGroupType(Enum):  
    TUTORIAL = "教學"
    PRACTICE = "交流"

    def __str__(self):
        return self.value
