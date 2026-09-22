import { expect, test } from "vitest";
import { orderTotalCents } from "@/lib/cart";
import { PRODUCTS } from "@/lib/products";

// Build a deterministic $200 in-stock cart (pick/define product priced 20000).
//
// The coupon here is FIXED, and must stay fixed. This ticket is about the
// ORDER of discount and tax, but the percent branch of discountCents is
// ECOM-114's planted defect — so a percent coupon made this test fail for a
// student who had fixed ECOM-141 perfectly and simply had not reached
// ECOM-114 yet. Correct work, graded red. The fixed branch is untouched by
// every other defect in this pack, which keeps this test measuring its own
// ticket and nothing else.
//
// $20 fixed is 10% of $200, so the expected total is unchanged: a tree with
// the ECOM-141 defect still returns 19600 (tax charged on the full 20000)
// and still fails.
test("tax is charged on the discounted subtotal", () => {
  const p = PRODUCTS.find((x) => x.priceCents === 20000 && x.stock > 0)!;
  const total = orderTotalCents(
    [{ productId: p.id, qty: 1 }],
    { type: "fixed", value: 2000 },
    800
  );
  expect(total).toBe(19440); // 180 taxable + 14.40 tax
});
