from secp256k1_1 import curve, scalar_mult, point_add
import random
import hashlib
import sys

top_secret="Hello"
s = int(hashlib.md5(top_secret.encode()).hexdigest(),16)

# Alice generate a random value of x
x = random.randint(0, curve.n-1)
xG = scalar_mult(x, curve.g)

chal = str(curve.g)+str(x)+str(xG)
h = hashlib.md5()
h.update(chal.encode())
v = random.randint(0, curve.n-1)
vG = scalar_mult(v, curve.g)
c = int(h.hexdigest(),16)

r = (v-c*x) % (curve.n)

# print(r)
a1 = scalar_mult(r,curve.g)
a2 = scalar_mult(c,xG)

print('vG => ', vG)
print('a1 => ', a1)
print('a2 => ', a2)

# Vcheck = point_add(a1, a2)

# Vcheck = point_add(scalar_mult(r,curve.g),scalar_mult(c,xG))

# print (f"Value to prove is {x}")
# print (f"\nxG= {xG}")
# print (f"\nv= {v}, vG={vG}")
# print (f"\nr= {r}, c={c}")

# if (vG==Vcheck): print("\nIt has been proven!!!")
# else: print("\nNot proven!!!")
