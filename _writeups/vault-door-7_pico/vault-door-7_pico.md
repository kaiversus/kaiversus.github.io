---
layout: writeup
title: "VaultDoor7 - PicoCTF"
date: 2026-01-10
description: ""
difficulty: Medium
category: Reverse
---

## Challenge Information

| Attribute | Value |
|-----------|-------|
| **Challenge Name** | VaultDoor7 |
| **Category** | Reverse |
| **Difficulty** | Medium |

## Description
Author: Author: Mark E. Haase

This vault uses bit shifts to convert a password string into an array of integers. Hurry, agent, we are running out of time to stop Dr. Evil's nefarious plans!

### Hints
- Use a decimal/hexadecimal converter such as this one: https://www.mathsisfun.com/binary-decimal-hexadecimal-converter.html
- You will also need to consult an ASCII table such as this one: https://www.asciitable.com/

**Files provided:**
<ul>
    <li>
        <a href="/_writeups/vault-door-7_pico/VaultDoor7.java" download>
            [Download] VaultDoor7.java
        </a>
    </li>
</ul>

**Connection info:**  

<https://play.picoctf.org/practice/challenge/65?page=1&search=vault>


## Reconnaissance 

#### Initial Observations

**Source code of VaultDoor8.java**
```java
import java.util.*;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;

class VaultDoor7 {
    public static void main(String args[]) {
        VaultDoor7 vaultDoor = new VaultDoor7();
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter vault password: ");
        String userInput = scanner.next();
	String input = userInput.substring("picoCTF{".length(),userInput.length()-1);
	if (vaultDoor.checkPassword(input)) {
	    System.out.println("Access granted.");
	} else {
	    System.out.println("Access denied!");
        }
    }

    // Each character can be represented as a byte value using its
    // ASCII encoding. Each byte contains 8 bits, and an int contains
    // 32 bits, so we can "pack" 4 bytes into a single int. Here's an
    // example: if the hex string is "01ab", then those can be
    // represented as the bytes {0x30, 0x31, 0x61, 0x62}. When those
    // bytes are represented as binary, they are:
    //
    // 0x30: 00110000
    // 0x31: 00110001
    // 0x61: 01100001
    // 0x62: 01100010
    //
    // If we put those 4 binary numbers end to end, we end up with 32
    // bits that can be interpreted as an int.
    //
    // 00110000001100010110000101100010 -> 808542562
    //
    // Since 4 chars can be represented as 1 int, the 32 character password can
    // be represented as an array of 8 ints.
    //
    // - Minion #7816
    public int[] passwordToIntArray(String hex) {
        int[] x = new int[8];
        byte[] hexBytes = hex.getBytes();
        for (int i=0; i<8; i++) {
            x[i] = hexBytes[i*4]   << 24
                 | hexBytes[i*4+1] << 16
                 | hexBytes[i*4+2] << 8
                 | hexBytes[i*4+3];
        }
        return x;
    }

    public boolean checkPassword(String password) {
        if (password.length() != 32) {
            return false;
        }
        int[] x = passwordToIntArray(password);
        return x[0] == 1096770097
            && x[1] == 1952395366
            && x[2] == 1600270708
            && x[3] == 1601398833
            && x[4] == 1716808014
            && x[5] == 1734305378
            && x[6] == 825374004
            && x[7] == 912340068;
    }
}
```

As you can see, the code already contains a piece of explian text:
```java
    // Each character can be represented as a byte value using its
    // ASCII encoding. Each byte contains 8 bits, and an int contains
    // 32 bits, so we can "pack" 4 bytes into a single int. Here's an
    // example: if the hex string is "01ab", then those can be
    // represented as the bytes {0x30, 0x31, 0x61, 0x62}. When those
    // bytes are represented as binary, they are:
    //
    // 0x30: 00110000
    // 0x31: 00110001
    // 0x61: 01100001
    // 0x62: 01100010
    //
    // If we put those 4 binary numbers end to end, we end up with 32
    // bits that can be interpreted as an int.
    //
    // 00110000001100010110000101100010 -> 808542562
    //
    // Since 4 chars can be represented as 1 int, the 32 character password can
    // be represented as an array of 8 ints.
    //
    // - Minion #7816
```
Simply put, the logic of this challenge is based on the fact that a single ASCII character has 8 bits, while an integer has 32 bits. The author uses this to encode the flag. So, the flag string is converted to binary, and then the binary data is converted into integers.

### Source Code Analysis  
We will reuse the data of the `checkPassword()` function:
```java
public boolean checkPassword(String password) {
    if (password.length() != 32) {
        return false;
    }
    int[] x = passwordToIntArray(password);
    return x[0] == 1096770097 //The data we will reuse
        && x[1] == 1952395366
        && x[2] == 1600270708
        && x[3] == 1601398833
        && x[4] == 1716808014
        && x[5] == 1734305378
        && x[6] == 825374004
        && x[7] == 912340068;
}
```

### Solution
To reverse the data, we just reverse the encoding logic:
Convert the integer numbers back to binary, then use that binary data to recover the ASCII characters (8 bits per character).

This is the reverse code with Python:

```python
def printPassword():
    x = [0]*8
    x[0] = 1096770097
    x[1] = 1952395366
    x[2] = 1600270708
    x[3] = 1601398833
    x[4] = 1716808014
    x[5] = 1734305378
    x[6] = 825374004
    x[7] = 912340068

    binary_data = ''
    password = ''
    for number in x:
        password += number.to_bytes(4, byteorder='little').decode('utf-8')
    print(password)

printPassword()
```

In my source code, I use the `to_byte()` and `decode()` functions. They are very convenient for decoding things related to the numeral system.

#### The result after run code:
```text
1b_Af0_tt1b_1hs_NiTfbf_g4521d4a6
```

## Flag
So, the flag is:
```
picoCTF{1b_Af0_tt1b_1hs_NiTfbf_g4521d4a6}
```
