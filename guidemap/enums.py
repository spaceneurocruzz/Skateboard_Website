from enum import Enum

class LocationType(Enum):  
    PARK = "滑板場"
    STORE = "商店"

    def __str__(self):
        return self.value
