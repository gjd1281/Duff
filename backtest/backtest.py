"""Strike-tier backtest for Duffs Way TOP picks.

Reads top-picks.csv (one row per settled TOP pick, checked against official
results) and prints the strike rate and level-$1 win return for each tier,
split into two periods so you can see whether a rule holds up.

Run:  python3 backtest/backtest.py
Add new settled rows to the CSV and re-run before changing any threshold.
finish: 1/2/3/... finishing place; NOT1 = lost, place unknown.
"""
import csv, os

LOCK, STRONG = 2.20, 2.80          # keep in step with stier() in app.js
SPLIT = "2026-10-01"               # first period ends the day before this

def tier(price):
    if price <= LOCK: return "LOCK"
    if price <= STRONG: return "STRONG"
    return "PASS"

rows = list(csv.DictReader(open(os.path.join(os.path.dirname(__file__), "top-picks.csv"))))
for r in rows:
    r["p"] = float(r["card_price"] or 0)
    r["won"] = r["finish"] == "1"

def line(label, sub):
    cells = []
    for name, part in (("before", [r for r in sub if r["date"] < SPLIT]), ("after", [r for r in sub if r["date"] >= SPLIT])):
        n = len(part)
        if not n: cells.append(f"{name}: none"); continue
        w = sum(r["won"] for r in part)
        ret = sum(r["p"] for r in part if r["won"])
        cells.append(f"{name}: {w:3}/{n:3} won {w/n:5.1%}  return {(ret-n)/n:+6.1%}")
    print(f"{label:22} " + "   ".join(cells))

priced = [r for r in rows if r["p"]]
line("All TOP picks", priced)
for t in ("LOCK", "STRONG", "PASS"):
    line(t, [r for r in priced if tier(r["p"]) == t])
line("LOCK + STRONG", [r for r in priced if tier(r["p"]) != "PASS"])
fav = [r for r in priced if r["top_was_fav"] != ""]
line("TOP was SP favourite", [r for r in fav if r["top_was_fav"] == "1"])
line("TOP not SP favourite", [r for r in fav if r["top_was_fav"] == "0"])
