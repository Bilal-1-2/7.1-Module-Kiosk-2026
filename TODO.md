# TODO: Post-Gym Lunch User Case Implementation

## Phase 1: Product Card Enhancements

- [x] 1.1 Analyze codebase and create implementation plan
- [x] 1.2 Add VG/V dietary badges to product cards
- [x] 1.3 Add kcal display on product cards

## Phase 2: "Best with..." Pairing System

- [x] 2.1 Define pairing rules for sides
- [x] 2.2 Create suggestion popup modal
- [x] 2.3 Implement accept/decline logic
- [x] 2.4 Auto-add paired items when accepted

## Phase 3: Cart Enhancement

- [x] 3.1 Update cart item structure to include kcal and product_id
- [x] 3.2 Display calories per item in cart
- [x] 3.3 Calculate and display total calories
- [x] 3.4 Real-time price and calorie updates

## Phase 4: Order Summary

- [x] 4.1 Display itemized list with calories
- [x] 4.2 Show total price and total calories
- [x] 4.3 Ensure independent item removal works correctly

## Testing Checklist

- [x] VG tag visible for vegan items (Warm Teriyaki Tempeh Bowl)
- [x] V tag visible for vegetarian items (Avocado & Halloumi Toastie)
- [x] Sweet Potato Wedges triggers Avocado Lime Crema suggestion
- [x] Zucchini Fries triggers Greek Yogurt Ranch suggestion
- [x] Can decline suggestion and manually add different dip
- [x] Removing Zucchini Fries doesn't remove Sriracha Mayo
- [x] Total calories update in real-time
- [x] Total price updates in real-time

## Implementation Complete ✅

All features for the "Post-Gym Lunch" user case have been implemented:

- Dietary badges (VG/V) on product cards
- "Best with..." pairing suggestions when adding sides
- Calorie tracking in cart with real-time totals
- Independent item removal (no cascade delete)
