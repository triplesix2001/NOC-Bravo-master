# Fjerning av NAT
# Legge til lokale adresser
# Finn ut hvilken regel som er 1, 2, 9
iptables -t nat -v -L -n --line-number

# Slett 1, 2, 9
iptables -t nat -D UBIOS_POSTROUTING_USER_HOOK 1

# Legge til for 1, 2, 9
sudo iptables -t nat -A UBIOS_POSTROUTING_USER_HOOK -o eth8 -s 10.0.0.0/8 -m comment --comment 00000001095216660501 -j MASQUERADE
sudo iptables -t nat -A UBIOS_POSTROUTING_USER_HOOK -o eth8 -s 172.16.0.0/12 -m comment -comment 00000001095216660501 -j MASQUERADE
sudo iptables -t nat -A UBIOS-POSTROUTING_USER_HOOK -o eth8 -s 192.168.0.0/16 -m comment --comment 00000001095216660501 -j MASQUERADE