import random

random_integers = [f"{random.randint(0, 9999):04}" for _ in range(12)]
print(random_integers)