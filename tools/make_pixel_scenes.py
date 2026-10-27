import binascii, struct, zlib
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'assets'
OUT.mkdir(parents=True, exist_ok=True)
W,H=600,72
palettes={
 'atrium':('#c9c79f','#e2ab58','#7e8b6b','#667559','#b89763','#784d39','#d3b887','#344533'),
 'city':('#bfccb7','#e4b25e','#92957d','#797d66','#c4ac7b','#845443','#e0ca99','#394a3c'),
 'sea':('#bac9bf','#e2ac5e','#7b9a91','#62847f','#9e8861','#80513b','#d6c09b','#344533'),
 'garden':('#c8d1af','#e4b367','#9aa675','#6f8a5f','#c7a46c','#825141','#e3c996','#385039'),
 'field':('#c7cfab','#e3ae5b','#a8a070','#60774c','#b99660','#80513d','#ddc18c','#334234'),
 'school':('#ceb991','#e9bd69','#9c8867','#725b45','#d1b37d','#8d4938','#e8d1a4','#3e3b32'),
 'sickroom':('#d7c69d','#e9bd69','#9a876e','#6d6250','#dac69c','#8c5c4a','#efddb3','#443c34'),
 'myth':('#c3b995','#e4ae59','#7a826d','#64735c','#b29a6d','#8c523c','#deca9c','#38463a'),
 'army':('#b7c1a8','#e5b15a','#81866b','#626c50','#9e8a64','#724936','#d8c194','#344033'),
 'banquet':('#d0ad8d','#edc16c','#a66e52','#77614b','#d4b078','#9c5139','#f0d6a4','#49382f')}
def rgb(s): return tuple(bytes.fromhex(s[1:]))
def save(name, scene):
  colors=list(map(rgb,palettes[scene])); sky,sun,hill,ground,stone,roof,light,dark=colors
  offset=(W-128)//2
  px=[[sky for _ in range(W)] for _ in range(H)]
  def rect(x,y,w,h,c):
    if not (x==0 and w>=W): x+=offset
    for yy in range(max(0,y),min(H,y+h)):
      for xx in range(max(0,x),min(W,x+w)): px[yy][xx]=c
  def circ(cx,cy,r,c):
    cx+=offset
    for y in range(cy-r,cy+r+1):
      for x in range(cx-r,cx+r+1):
        if (x-cx)**2+(y-cy)**2<=r*r and 0<=x<W and 0<=y<H:px[y][x]=c
  def tri(x,y,w,h,c):
    for dy in range(h):
      half=(w*dy)//(2*h)
      rect(x+w//2-half,y+dy,2*half+1,1,c)
  def edge_tree(x,y,height,color):
    for dy in range(height):
      half=max(1,(dy*5)//height)
      for xx in range(x+7-half,x+8+half):
        if 0<=xx<W and 0<=y+dy<H:px[y+dy][xx]=color
    for yy in range(y+height-2,min(H,y+height+8)):
      for xx in range(x+5,x+11):
        if 0<=xx<W:px[yy][xx]=dark
  if scene not in ('school','sickroom','banquet'): circ(104,14,7,sun)
  if scene in ('atrium','city','garden','field','myth'): edge_tree(19,20,29,ground); edge_tree(W-36,18,33,ground)
  if scene=='sea':
    tri(2,25,43,23,hill); tri(18,29,53,20,ground)
    rect(0,47,W,25,hill)
    for y in (52,59,66):
      for x in range((y//3)%12,W,18): rect(x,y,8,1,light)
    rect(18,43,33,3,dark); tri(22,26,2,17,light); rect(22,35,2,8,roof); tri(27,31,17,14,light)
  elif scene=='field':
    rect(0,40,W,32,ground)
    for row,y in enumerate((45,53,61,68)):
      for x in range(8,W,16):
        rect(x+(row%2)*5,y,2,5,dark); rect(x-1+(row%2)*5,y+1,5,1,light)
    rect(151,34,82,24,stone); tri(142,20,100,20,roof); rect(144,38,97,3,dark)
    for x in (165,181,219): rect(x,44,4,14,light)
    rect(195,44,15,14,dark)
  elif scene in ('school','sickroom','banquet'):
    rect(0,0,W,51,stone); rect(0,51,W,21,roof)
    for x in (20,344): rect(x,8,7,36,light); rect(x-3,7,13,3,dark); rect(x-3,43,13,3,dark)
    if scene=='school':
      rect(156,16,74,24,dark); rect(162,21,48,2,light); rect(162,27,55,2,light); rect(162,33,36,2,light)
      rect(140,46,106,4,roof); rect(148,50,5,5,dark); rect(232,50,5,5,dark)
    elif scene=='sickroom':
      rect(145,44,100,5,dark); rect(151,36,14,9,light); rect(165,40,66,8,roof)
      rect(150,49,5,8,dark); rect(235,49,5,8,dark); rect(155,38,3,3,sun)
    else:
      rect(139,43,111,5,dark); rect(146,39,97,5,roof)
      for x in (158,179,204,226): rect(x,35,5,6,light)
      rect(161,50,4,6,dark); rect(224,50,4,6,dark)
  elif scene in ('myth','army'):
    rect(0,47,W,25,ground); tri(126,6,129,43,hill); tri(150,14,100,34,ground)
    if scene=='myth':
      rect(161,31,67,24,stone); tri(152,17,85,16,roof); rect(150,30,89,3,dark)
      for x in (165,184,203,222): rect(x,34,5,21,light)
      rect(191,43,16,12,dark)
    else:
      rect(141,27,102,27,stone); rect(134,23,116,5,dark)
      for x in range(148,240,18): rect(x,31,7,12,ground); rect(x+2,45,3,9,dark)
      for x,y in ((171,37),(197,36),(223,37)):
        circ(x,y,5,sun); rect(x-1,y+4,3,8,roof)
  else:
    rect(0,48,W,24,ground)
    tri(0,13,55,38,hill); tri(21,21,65,29,ground)
    if scene=='city':
      for x,height in [(4,14),(18,22),(103,16),(116,24)]:
        rect(x,40-height,11,height,stone); rect(x-2,38-height,15,3,dark)
        for wy in range(42-height,39,6): rect(x+3,wy,2,3,dark); rect(x+7,wy,2,3,dark)
    elif scene=='garden':
      for x,y,size in [(12,31,10),(21,27,13),(112,30,12)]:
        rect(x+size//2,y+size,3,20,dark); circ(x+size//2,y+size//2,size//2,ground); rect(x-1,y+size//2,size+2,3,hill)
    else:
      tri(2,30,38,22,hill)
    # Roman villa, pediment, columns, doorway and tiled roof.
    rect(43,38,45,17,stone); tri(38,23,55,17,roof); rect(40,38,51,3,dark)
    for x in (47,58,69,80): rect(x,41,4,14,light); rect(x,41,4,2,dark)
    rect(64,45,11,10,dark); rect(66,45,2,10,roof)
    for x in range(45,85,8): rect(x,31,4,2,light)
  # Two visitors in tunics, rendered on an 8-pixel grid.
  def person(x,y,tunic):
    rect(x+3,y,6,6,light); rect(x+2,y-1,8,3,dark)
    rect(x+1,y+6,10,9,tunic); rect(x,y+7,2,7,dark); rect(x+10,y+7,2,7,dark)
    rect(x+2,y+15,3,5,dark); rect(x+7,y+15,3,5,dark); rect(x+1,y+19,4,2,roof); rect(x+7,y+19,4,2,roof)
  person(29,42,roof); person(94,42,ground)
  raw=b''.join(b'\x00'+bytes(v for p in row for v in p) for row in px)
  def chunk(tag,data): return struct.pack('>I',len(data))+tag+data+struct.pack('>I',binascii.crc32(tag+data)&0xffffffff)
  png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(raw,9))+chunk(b'IEND',b'')
  with open(OUT/(name+'.png'),'wb') as f:f.write(png)
for scene in palettes: save(scene,scene)
