# SKILL: TESTING STRATEGY & IMPLEMENTATION

**Version:** Gold v1.1

## Mindset
The overriding goal of testing is developer confidence to deploy rapidly. Test behaviors, not implementations.

## Testing Lenses
1. Risk Importance
2. Behavior vs Implementation Detail
3. Test Level Fit
4. Determinism and Stability
5. Coverage Quality
6. Maintenance Cost
7. Observability and Diagnosability
8. Regression Protection
9. Boundary Realism
10. Confidence Balance

## Test Layer Guidance
- Static Analysis / Types: Enforce strictly everywhere.
- Unit Tests: Validate complex, isolated business logic.
- Integration Tests: Verify module boundaries, database interactions, and API contracts. Highest ROI for web apps.
- E2E Tests: Validate critical user flows in real browser. Use sparingly.
