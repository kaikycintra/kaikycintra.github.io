from random import shuffle
import json

def sorteio_single_cycle(amigos):
    shuffled = amigos[:]
    shuffle(shuffled)

    dict_secreto = {}
    for i in range(len(shuffled)):
        dict_secreto[shuffled[i]] = shuffled[(i + 1) % len(shuffled)]

    return dict_secreto

def ordem_sorteio(dict_secreto):
    first_person = list(dict_secreto.keys())[0]
    ordem = [first_person]
    current_person = first_person

    while True:
        next_person = dict_secreto[current_person]
        if next_person == first_person:
            ordem.append(next_person)
            break
        ordem.append(next_person)
        current_person = next_person

    print(" -> ".join(ordem))


fam1 = ["Kyara", "Kaiky", "Leandro", "Daniela"]
fam2 = ["Fábio", "Binho", "Caio"]
fam3 = ["Myriam", "Manoel"]
fam4 = ["Natalina", "Rogerio", "Pedro"]
familias = [fam1, fam2, fam3, fam4]
amigos = [pessoa for familia in familias for pessoa in familia]

# Function to encode assignments into binary
def encode_to_binary(dict_secreto):
    binary_assignments = {}
    for person, secret_friend in dict_secreto.items():
        # Convert the secret friend's name to binary
        binary_assignments[person] = " ".join(format(ord(char), "08b") for char in secret_friend)
    return binary_assignments

fam1 = ["Kyara", "Kaiky", "Leandro", "Daniela"]
fam2 = ["Fábio", "Binho", "Caio"]
fam3 = ["Myriam", "Manoel"]
fam4 = ["Natalina", "Rogerio", "Pedro"]
familias = [fam1, fam2, fam3, fam4]
amigos = [pessoa for familia in familias for pessoa in familia]

# Generate assignments
dict_secreto = sorteio_single_cycle(amigos)

# Encode assignments
binary_assignments = encode_to_binary(dict_secreto)

# Save the binary data
with open("binary_assignments.json", "w") as file:
    json.dump(binary_assignments, file)

print("Binary assignments saved to 'binary_assignments.json'")

