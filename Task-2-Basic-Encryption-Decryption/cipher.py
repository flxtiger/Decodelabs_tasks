def encrypt_text(text: str, shift: int) -> str:
    result = ""
    for char in text:
        if char.isalpha():
            # Determine ASCII offset based on uppercase or lowercase
            ascii_offset = 65 if char.isupper() else 97
            # Shift the character and wrap around the alphabet
            shifted_char = chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
            result += shifted_char
        else:
            # Leave non-alphabetic characters unchanged
            result += char
    return result

def decrypt_text(text: str, shift: int) -> str:
    # Decryption is just encryption with a negative shift
    return encrypt_text(text, -shift)
