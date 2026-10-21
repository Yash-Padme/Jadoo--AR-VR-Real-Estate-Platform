# 13. Experiment Design: Jadoo

## 1. Objective

Define a structured approach for validating Jadoo's product hypotheses through user interviews, usability testing, controlled experiments, and behavioral analytics.

The objective is to determine whether Jadoo's rental decision-support workflow helps users evaluate properties more efficiently and confidently.

## 2. Core Product Hypothesis

**Primary hypothesis:**

If renters can compare properties using standardized cost breakdowns, location information, amenities, and available virtual inspections, they will be able to identify suitable rental properties with less effort than through unstructured browsing.

This hypothesis must be validated with observed user behavior rather than feature interest alone.

## 3. Experiment Principles

- Define the hypothesis before collecting results.
- Specify the primary metric and decision rule in advance.
- Change one major variable at a time where practical.
- Use realistic rental-search tasks.
- Distinguish usability findings from statistically significant effects.
- Avoid interpreting small samples as representative of the entire market.
- Record negative and inconclusive results.
- Do not claim causal impact from observational analytics alone.

## 4. Experiment 1: Problem Validation Interviews

**Objective:** Determine whether rental-search friction is significant enough to justify Jadoo's proposed workflow.

### Hypothesis

Renters experience meaningful difficulty comparing properties, understanding total expenses, or evaluating properties remotely.

### Method

Interview 10-15 people who have searched for rental housing in Bangalore within the previous 12 months.

### Questions

1. Describe your most recent rental search.
2. Which platforms or people did you use?
3. How did you compare properties?
4. Which expenses were difficult to understand?
5. What information was missing before a property visit?
6. How much effort did you spend evaluating alternatives?
7. What caused you to reject a property?
8. Which parts of the process would you most want to improve?

### Data to Record

- Current search workflow.
- Frequency of each problem mentioned.
- Existing workarounds.
- Consequences of the problem.
- Importance of cost, commute, and inspection.
- Examples of recent behavior.

### Decision Rule

Proceed with the proposed problem framing if recurring, specific examples support it across multiple participants.

If users do not report the expected problems, revise the target segment or product hypothesis before expanding implementation.

This is qualitative discovery, not a statistical prevalence study.

## 5. Experiment 2: Property Comparison Usability

**Objective:** Determine whether a structured comparison interface helps users evaluate rental options.

### Hypothesis

Users can identify a suitable property more efficiently when important attributes are presented side by side.

### Variants

- **Variant A:** Individual property detail pages.
- **Variant B:** Side-by-side comparison of the same properties.

### Method

Recruit 5-8 representative renters for an initial usability study.

Give participants equivalent rental scenarios and realistic property records.

Ask them to select the property that best matches a specified budget, furnishing preference, and commute requirement.

### Primary Metric

Task completion rate.

Task completion = Participants who correctly complete the defined evaluation task ÷ Participants who attempt the task.

### Secondary Metrics

- Time taken.
- Number of navigation errors.
- Number of incorrect cost interpretations.
- User-reported confidence.
- Missing information identified.

### Decision Rule

Retain and refine the comparison interface if participants can complete the task and the observed workflow addresses real points of confusion.

Do not claim a statistically significant improvement from a small formative usability sample.

## 6. Experiment 3: Cost Breakdown

**Objective:** Determine whether separating recurring costs from upfront payments improves cost comprehension.

### Hypothesis

Users understand the financial implications of a rental property more accurately when rent, maintenance, deposits, and other disclosed charges are separated.

### Variants

- **Variant A:** Listing displays rent and individual expense fields.
- **Variant B:** Listing displays a structured monthly cost and upfront payment breakdown.

### Method

Ask users to calculate the monthly cost and initial payment for a fictional rental property.

Use the same underlying values in both variants.

### Primary Metric

Cost calculation accuracy.

Formula:

Cost calculation accuracy = Participants who calculate both requested totals correctly ÷ Participants attempting the task.

### Secondary Metrics

- Time to complete the calculation.
- Number of omitted expense components.
- Misinterpretation of refundable deposits.
- User-reported clarity.

### Decision Rule

Prefer the structured breakdown if it improves comprehension without concealing missing or uncertain expenses.

All test variants must use consistent calculation rules.

## 7. Experiment 4: Virtual Inspection

**Objective:** Assess whether virtual inspection improves remote property evaluation.

### Hypothesis

Access to a supported 360-degree or 3D property tour improves users' understanding of the property's layout compared with ordinary photographs alone.

### Variants

- **Variant A:** Property photographs and available descriptions.
- **Variant B:** The same photographs and descriptions plus a virtual tour.

### Method

Use properties with genuine, suitable virtual-tour assets.

Ask participants to assess layout suitability and decide whether they would request a physical visit.

### Primary Metric

Correct completion of predefined layout-evaluation tasks.

### Secondary Metrics

- Time spent evaluating the property.
- Confidence in understanding the layout.
- Intention to arrange a physical visit.
- Reported technical issues.

### Decision Rule

Prioritize virtual tours if they provide meaningful additional information and improve evaluation outcomes.

Do not interpret reduced physical-visit intent alone as success. Users may still need an in-person visit to verify important property characteristics.

## 8. Experiment 5: Search and Filtering

**Objective:** Determine whether the search interface helps users discover relevant properties.

### Hypothesis

A focused set of budget, locality, furnishing, and amenity filters reduces irrelevant property evaluations.

### Method

Ask users to find properties matching predefined rental requirements.

Observe the number of properties opened, filter changes, task completion, and time taken.

### Primary Metric

Successful task completion rate.

### Secondary Metrics

- Time to first relevant property.
- Number of filters used.
- Number of irrelevant listings opened.
- Frequency of zero-result searches.
- User confusion about filter behavior.

### Decision Rule

Simplify or adjust filters when they repeatedly prevent users from finding valid matches or produce confusing results.

Do not add filters solely because they are technically easy to implement.

## 9. Experiment 6: Qualified Shortlisting

**Objective:** Determine whether users can create a useful shortlist rather than simply save individual listings.

### Hypothesis

Combining property saving with standardized comparison helps users produce a shortlist that meets their essential requirements.

### Method

Provide a realistic rental scenario and ask participants to identify suitable properties, compare alternatives, and save their preferred options.

### Primary Metric

Qualified shortlist completion rate.

A qualified shortlist contains at least two distinct properties that satisfy the scenario's defined essential requirements.

### Secondary Metrics

- Time to qualified shortlist.
- Number of properties saved.
- Number of saved properties later removed.
- Ability to explain the final selection.
- User-reported decision confidence.

### Decision Rule

Refine the shortlist and comparison experience when users save irrelevant properties, cannot revisit saved options, or struggle to distinguish suitable alternatives.

## 10. Experiment Prioritization

| Experiment | Expected value | Effort | Priority |
|---|---|---|---|
| Problem interviews | High | Low | P0 |
| Comparison usability | High | Low to medium | P0 |
| Cost breakdown comprehension | High | Low | P0 |
| Search and filtering | High | Low to medium | P0 |
| Qualified shortlisting | High | Medium | P0 |
| Virtual inspection | Medium to high | Medium | P1 |

These priorities reflect the MVP's core assumptions, not measured experiment outcomes.

## 11. Controlled A/B Testing

A/B testing should be introduced only when sufficient eligible traffic is available.

### Example

Compare two property-detail layouts:

- **Control:** Existing property-detail layout.
- **Treatment:** Layout with a prominent cost breakdown and clearer comparison action.

### Experimental Design

1. Define the primary metric.
2. Define eligibility criteria.
3. Randomly assign eligible users to variants.
4. Keep assignment stable during the experiment.
5. Track exposure and relevant outcomes.
6. Monitor technical failures and guardrail metrics.
7. Analyze results using the predefined statistical method.
8. Document the decision.

### Potential Primary Metric

Percentage of eligible users who save at least one suitable property after viewing its details.

### Guardrail Metrics

- Property-detail load time.
- API error rate.
- Cost calculation errors.
- User abandonment.
- Misleading or incomplete cost displays.

### Decision Rule

Adopt the treatment only when the evidence supports a meaningful improvement in the primary metric and guardrails remain acceptable.

Do not declare a winner solely because one variant has a higher observed conversion rate.

## 12. Sample Size and Statistical Considerations

The required sample size depends on:

- Baseline conversion rate.
- Minimum improvement worth detecting.
- Statistical significance threshold.
- Desired statistical power.
- Experiment design and allocation.

For a conventional two-group test of proportions, a common planning choice is a 5% significance level and 80% power, but the appropriate settings depend on the decision and cost of errors.

Estimate sample size before launching a confirmatory A/B test.

If traffic is too low, use interviews, task-based usability tests, and descriptive analytics instead of underpowered significance testing.

## 13. Instrumentation Requirements

Experiments require reliable tracking of:

- `experiment_exposed`
- `search_submitted`
- `property_viewed`
- `property_saved`
- `comparison_started`
- `comparison_completed`
- `virtual_tour_opened`
- `property_enquiry_started`

Each experiment event should include:

- Experiment identifier.
- Variant identifier.
- Timestamp.
- Anonymous or pseudonymous user identifier where appropriate.
- Relevant property or session context.
- Successful outcome status where applicable.

Avoid sending unnecessary personal information to the analytics system.

## 14. Experiment Reporting Template

Use the following template for every experiment.

### Experiment Metadata

- **Experiment ID:**
- **Owner:**
- **Start date:**
- **End date:**
- **Target segment:**

### Hypothesis

What specific user behavior or outcome is expected to change?

### Method

- Control or baseline.
- Treatment.
- Participant or traffic eligibility.
- Data collection method.

### Metrics

- Primary metric.
- Secondary metrics.
- Guardrail metrics.
- Measurement window.

### Results

- Number of eligible participants or users.
- Observed outcomes.
- Data-quality issues.
- Qualitative feedback.
- Statistical analysis, where appropriate.

### Decision

- Adopt.
- Iterate.
- Reject.
- Inconclusive.

### Follow-up

Document the product changes, further tests, and unresolved questions.

## 15. Experiment Roadmap

### Phase 1: Discover
- Conduct problem interviews.
- Validate target-user needs.
- Review existing rental-search workarounds.

### Phase 2: Validate Core Usability
- Test property search.
- Test cost comprehension.
- Test side-by-side comparison.
- Test shortlisting.

### Phase 3: Validate Enhancements
- Evaluate commute information.
- Test supported virtual inspection.
- Investigate listing freshness and trust.

### Phase 4: Optimize
- Establish baseline KPIs.
- Run controlled experiments when traffic permits.
- Prioritize improvements based on evidence.

## 16. Risks and Limitations

- Participants may express preferences that differ from actual behavior.
- Small usability samples cannot establish population-level effects.
- Synthetic demo listings may not represent real-world data quality.
- Missing inventory may affect search results independently of interface quality.
- Virtual inspection outcomes depend on the quality and completeness of the media.
- Multiple simultaneous changes make causal attribution difficult.
- Analytics errors can invalidate experiment conclusions.

Mitigate these risks by using realistic tasks, validated event instrumentation, transparent reporting, and carefully defined experiments.

## 17. Success Criteria

Jadoo's initial experimentation program is successful when it produces:

- Evidence about the most important rental-search problems.
- Validated usability findings for the core workflow.
- Reliable baseline metrics.
- Clear decisions about which features improve user outcomes.
- A prioritized list of product changes supported by evidence.
- Documented limitations and unresolved hypotheses.

The goal is not to prove that every proposed feature works. It is to determine which features create measurable value for the target users.

## 18. Conclusion

Jadoo should validate its core product assumptions through problem interviews, usability testing, cost-comprehension studies, and controlled experiments when sufficient traffic becomes available.

The initial focus should be on whether users can discover, evaluate, compare, and shortlist suitable rental properties with less effort and greater clarity. Advanced features should be expanded only when evidence supports their value.