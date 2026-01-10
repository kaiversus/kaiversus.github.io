---
layout: writeup
title: "VaultDoor8 - PicoCTF"
date: 2026-01-10
description: ""
difficulty: Medium
category: Reverse
---

## Challenge Information

| Attribute | Value |
|-----------|-------|
| **Challenge Name** | VaultDoor8 |
| **Category** | Reverse |
| **Difficulty** | Medium |

## Description
Author: Author: Mark E. Haase

Apparently Dr. Evil's minions knew that our agency was making copies of their source code, because they intentionally sabotaged this source code in order to make it harder for our agents to analyze and crack into! The result is a quite mess, but I trust that my best special agent will find a way to solve it.

### Hints
- Clean up the source code so that you can read it and understand what is going on.
- Draw a diagram to illustrate which bits are being switched in the scramble() method, then figure out a sequence of bit switches to undo it. You should be able to reuse the switchBits() method as is.

**Files provided:**
<ul>
    <li>
        <a href="/_writeups/vault-door-8_pico/VaultDoor8.java" download>
            [Download] VaultDoor8.java
        </a>
    </li>
</ul>

**Connection info:**  

<https://play.picoctf.org/practice/challenge/10?category=3&page=1&search=vaul>


## Reconnaissance 

#### Initial Observations

**Source code of VaultDoor8.java**
```java
// These pesky special agents keep reverse engineering our source code and then
// breaking into our secret vaults. THIS will teach those sneaky sneaks a
// lesson.
//
// -Minion #0891
import java.util.*; import javax.crypto.Cipher; import javax.crypto.spec.SecretKeySpec;
import java.security.*; class VaultDoor8 {public static void main(String args[]) {
Scanner b = new Scanner(System.in); System.out.print("Enter vault password: ");
String c = b.next(); String f = c.substring(8,c.length()-1); VaultDoor8 a = new VaultDoor8(); if (a.checkPassword(f)) {System.out.println("Access granted."); }
else {System.out.println("Access denied!"); } } public char[] scramble(String password) {/* Scramble a password by transposing pairs of bits. */
char[] a = password.toCharArray(); for (int b=0; b<a.length; b++) {char c = a[b]; c = switchBits(c,1,2); c = switchBits(c,0,3); /* c = switchBits(c,14,3); c = switchBits(c, 2, 0); */ c = switchBits(c,5,6); c = switchBits(c,4,7);
c = switchBits(c,0,1); /* d = switchBits(d, 4, 5); e = switchBits(e, 5, 6); */ c = switchBits(c,3,4); c = switchBits(c,2,5); c = switchBits(c,6,7); a[b] = c; } return a;
} public char switchBits(char c, int p1, int p2) {/* Move the bit in position p1 to position p2, and move the bit
that was in position p2 to position p1. Precondition: p1 < p2 */ char mask1 = (char)(1 << p1);
char mask2 = (char)(1 << p2); /* char mask3 = (char)(1<<p1<<p2); mask1++; mask1--; */ char bit1 = (char)(c & mask1); char bit2 = (char)(c & mask2); /* System.out.println("bit1 " + Integer.toBinaryString(bit1));
System.out.println("bit2 " + Integer.toBinaryString(bit2)); */ char rest = (char)(c & ~(mask1 | mask2)); char shift = (char)(p2 - p1); char result = (char)((bit1<<shift) | (bit2>>shift) | rest); return result;
} public boolean checkPassword(String password) {char[] scrambled = scramble(password); char[] expected = {
0xF4, 0xC0, 0x97, 0xF0, 0x77, 0x97, 0xC0, 0xE4, 0xF0, 0x77, 0xA4, 0xD0, 0xC5, 0x77, 0xF4, 0x86, 0xD0, 0xA5, 0x45, 0x96, 0x27, 0xB5, 0x77, 0xF1, 0xC2, 0xD1, 0xB4, 0xD1, 0xB4, 0xF1, 0xF1, 0x85 }; return Arrays.equals(scrambled, expected); } }
```

The first look might be a bit “scary” since the code is complex and hard to read. Don’t worry, just use `Shift + Alt + F` in VS Code, and everything will look much clearer: 

```java
// These pesky special agents keep reverse engineering our source code and then
// breaking into our secret vaults. THIS will teach those sneaky sneaks a
// lesson.
//
// -Minion #0891
import java.util.*;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;

class VaultDoor8 {
    public static void main(String args[]) {
        Scanner b = new Scanner(System.in);
        System.out.print("Enter vault password: ");
        String c = b.next();
        String f = c.substring(8, c.length() - 1);
        VaultDoor8 a = new VaultDoor8();
        if (a.checkPassword(f)) {
            System.out.println("Access granted.");
        } else {
            System.out.println("Access denied!");
        }
    }

    public char[] scramble(String password) {/* Scramble a password by transposing pairs of bits. */
        char[] a = password.toCharArray();
        for (int b = 0; b < a.length; b++) {
            char c = a[b];
            c = switchBits(c, 1, 2);
            c = switchBits(c, 0, 3);
            /* c = switchBits(c,14,3); c = switchBits(c, 2, 0); */ c = switchBits(c, 5, 6);
            c = switchBits(c, 4, 7);
            c = switchBits(c, 0, 1);
            /* d = switchBits(d, 4, 5); e = switchBits(e, 5, 6); */ c = switchBits(c, 3, 4);
            c = switchBits(c, 2, 5);
            c = switchBits(c, 6, 7);
            a[b] = c;
        }
        return a;
    }

    public char switchBits(char c, int p1, int p2) {
        /*
         * Move the bit in position p1 to position p2, and move the bit
         * that was in position p2 to position p1. Precondition: p1 < p2
         */ char mask1 = (char) (1 << p1);
        char mask2 = (char) (1 << p2);
        /* char mask3 = (char)(1<<p1<<p2); mask1++; mask1--; */ char bit1 = (char) (c & mask1);
        char bit2 = (char) (c & mask2);
        /*
         * System.out.println("bit1 " + Integer.toBinaryString(bit1));
         * System.out.println("bit2 " + Integer.toBinaryString(bit2));
         */ char rest = (char) (c & ~(mask1 | mask2));
        char shift = (char) (p2 - p1);
        char result = (char) ((bit1 << shift) | (bit2 >> shift) | rest);
        return result;
    }

    public boolean checkPassword(String password) {
        char[] scrambled = scramble(password);
        char[] expected = {
                0xF4, 0xC0, 0x97, 0xF0, 0x77, 0x97, 0xC0, 0xE4, 0xF0, 0x77, 0xA4, 0xD0, 0xC5, 0x77, 0xF4, 0x86, 0xD0,
                0xA5, 0x45, 0x96, 0x27, 0xB5, 0x77, 0xF1, 0xC2, 0xD1, 0xB4, 0xD1, 0xB4, 0xF1, 0xF1, 0x85 };
        return Arrays.equals(scrambled, expected);
    }
}
```


### Source Code Analysis  
After skimming the source code, you can focus on this function:
```java
public boolean checkPassword(String password) {
    char[] scrambled = scramble(password);
    char[] expected = {
            0xF4, 0xC0, 0x97, 0xF0, 0x77, 0x97, 0xC0, 0xE4, 0xF0, 0x77, 0xA4, 0xD0, 0xC5, 0x77, 0xF4, 0x86, 0xD0,
            0xA5, 0x45, 0x96, 0x27, 0xB5, 0x77, 0xF1, 0xC2, 0xD1, 0xB4, 0xD1, 0xB4, 0xF1, 0xF1, 0x85 };
    return Arrays.equals(scrambled, expected);
}
```
This function is used to check whether the password is correct, and inside it, you can se the `scramble` does something with tthe `password`.

```java
public char[] scramble(String password) {/* Scramble a password by transposing pairs of bits. */
    char[] a = password.toCharArray();
    for (int b = 0; b < a.length; b++) {
        char c = a[b];
        c = switchBits(c, 1, 2);
        c = switchBits(c, 0, 3);
        /* c = switchBits(c,14,3); c = switchBits(c, 2, 0); */ 
        c = switchBits(c, 5, 6);
        c = switchBits(c, 4, 7);
        c = switchBits(c, 0, 1);
        /* d = switchBits(d, 4, 5); e = switchBits(e, 5, 6); */ 
        c = switchBits(c, 3, 4);
        c = switchBits(c, 2, 5);
        c = switchBits(c, 6, 7);
        a[b] = c;
    }
    return a;
}
```

And inside the function you can see the `switchBits` is doing something again:

```java
public char switchBits(char c, int p1, int p2) {
    /*
    * Move the bit in position p1 to position p2, and move the bit
    * that was in position p2 to position p1. Precondition: p1 < p2
    */ char mask1 = (char) (1 << p1);
    char mask2 = (char) (1 << p2);
    /* char mask3 = (char)(1<<p1<<p2); mask1++; mask1--; */ char bit1 = (char) (c & mask1);
    char bit2 = (char) (c & mask2);
    /*
    * System.out.println("bit1 " + Integer.toBinaryString(bit1));
    * System.out.println("bit2 " + Integer.toBinaryString(bit2));
    */ char rest = (char) (c & ~(mask1 | mask2));
    char shift = (char) (p2 - p1);
    char result = (char) ((bit1 << shift) | (bit2 >> shift) | rest);
    return result;
}
```

Simply put, the author wants to confuse things by switching the bits of each character according to their own rules. The goal is to make it harder for the hacker to read and bypass.
- The logic in `switchBits()` is to swap some bits in a single character
- The logic in `scramble()` is to define a rule to confuse the bits using `switchBits()` function.

### Vulnerability Identification

The main vulnerability here is that `switchBits()` is symmetric, which means we can reverse the logic easily.


## Solution
We will rewrite the code by Java and reuse the function `switchBits()`, only reversing the logic in `scramble()`, like this:

```java
c = switchBits(c, 6, 7);
c = switchBits(c, 2, 5);
c = switchBits(c, 3, 4);
c = switchBits(c, 0, 1);
c = switchBits(c, 4, 7);
c = switchBits(c, 5, 6);
c = switchBits(c, 0, 3);
c = switchBits(c, 1, 2);
```
And now, we can complete the Python code with the logic above:

```java
class VaultDoor8 {
    public void main(String args[]) {
        char[] key = {
                0xF4, 0xC0, 0x97, 0xF0, 0x77, 0x97, 0xC0, 0xE4, 0xF0, 0x77, 0xA4, 0xD0, 0xC5, 0x77, 0xF4, 0x86, 0xD0,
                0xA5, 0x45, 0x96, 0x27, 0xB5, 0x77, 0xF1, 0xC2, 0xD1, 0xB4, 0xD1, 0xB4, 0xF1, 0xF1, 0x85 };
        char[] password = reverse(key);
        System.out.println(password);
    }

    public char[] reverse(char[] scrambled) { //rename scramble => reverse and reverse the logic 
        char[] a = scrambled;
        for (int b = 0; b < a.length; b++) {
            char c = a[b];
            c = switchBits(c, 6, 7);
            c = switchBits(c, 2, 5);
            c = switchBits(c, 3, 4);
            c = switchBits(c, 0, 1);
            c = switchBits(c, 4, 7);
            c = switchBits(c, 5, 6);
            c = switchBits(c, 0, 3);
            c = switchBits(c, 1, 2);
            a[b] = c;
        }
        return a;
    }

    public char switchBits(char c, int p1, int p2) { // reuse this function, no edit
        char mask1 = (char) (1 << p1);
        char mask2 = (char) (1 << p2);
        char bit1 = (char) (c & mask1);
        char bit2 = (char) (c & mask2);
        char rest = (char) (c & ~(mask1 | mask2));
        char shift = (char) (p2 - p1);
        char result = (char) ((bit1 << shift) | (bit2 >> shift) | rest);
        return result;
    }
}
```
In the code above:
* I reuse the `swithBits()` without changing anything
* Reuse the `key` - char array given in the challenge. 
* Reversing the logic in `scramble()` function and rename it to `reverse()`.
* Finally, by using only the `key` and applying the reverse logic, we can recover the flag.

#### The result after run code:
```text
s0m3_m0r3_b1t_sh1fTiNg_785c5c77d
```

## Flag
So, the flag is:
```
picoCTF{s0m3_m0r3_b1t_sh1fTiNg_785c5c77d}
```
