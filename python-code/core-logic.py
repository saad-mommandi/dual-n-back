import random
import string

def generate_random():
    return generate_random_character(), generate_random_position()

def generate_random_character():
    return random.choice(string.ascii_uppercase)

def generate_random_position():
    return random.randrange(0,8,1)


if __name__ == '__main__':
    print(generate_random())
    print(generate_random())
    print(generate_random())
    print(generate_random())
    print(generate_random())