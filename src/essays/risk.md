---
title: "Basics of Market Risk"
excerpt: "Measuring and backtesting VaR using parametric and historical methods."
date: "2026-02-01"
type: "math"
tags: ["finance", "risk"]
---

Almost everyone has heard a version of "All investments are subject to
_market risk_."

The market prices most financial assets. And these 
prices are based on many factors
like interest rates, expected inflation,
company earnings, and politics. But this
is far from an exhaustive list and
there's a lot of uncertainty and randomness involved. 
If you hold an asset then you're
more than happy if the market prices it higher, 
but if it swings the other way,
it's a real problem. When you're short on
an asset, it's exactly the opposite.

Essentially, this risk that the market
prices assets differently is market risk.

Banks and asset managers trade a lot
of assets and always bear this risk.
Since the financial system
is globally interconnected,
and financial crises
are very expensive for economies, regulators
also care about it. Investors care about it 
for optimizing portfolios
and managing risks internally. Regulators care about it
to impose capital restrictions.

Within the quantitative approach we take
a probabilistic perspective, and define market risk
more precisely: It's the possibility of large
losses over a fixed investment horizon. Concretely,
the problem is to estimate a probability distribution of returns
over the chosen period, compute a 
metric related to the left tail, and backtest it.

Value-at-Risk (VaR) is a widely-used risk metric.
It measures the maximum loss over a fixed time period
at a given confidence level. For example,
a 1-day 99% VaR of 2% means that 
the 1-day loss would be less than 2%
with a 99% probability. You could also say it
the other way around:
the 1-day loss would be more than 2%
with a 1% probability. 

Let's consider a single-asset portfolio
with [GLD](https://www.nasdaq.com/market-activity/etf/gld),
and estimate and backtest its 1-day 99% VaR. [[1](#note-1)]

Suppose that $X_i$ are the i.i.d. daily log-returns
for $i = 1, \ldots, n$. We
(1) estimate its density function $f_X$, (2) compute
$\text{VaR}_{1-\alpha} = -F_X^{-1}(\alpha)$, and (3) backtest 
the computed $\text{VaR}_{1-\alpha}$,
where $F_X$ is the distribution function and
$1 - \alpha$ is the chosen confidence level. [[2](#note-2)]

#### (1) Model returns

![GLD 5Y Returns](/images/risk-1-GLD-returns.png)

We fit the normal and t distributions, and
also use kernel density estimation.
If we suppose $X_i \overset{\text{i.i.d.}}{\sim} \text{ Normal}(\mu, \sigma^2)$,
or that $X_i \overset{\text{i.i.d.}}{\sim} \text{ t}(\mu, \sigma, \nu)$,
the parameters can be estimated using
maximum likelihood estimation. For the smooth
historical density, we use the Gaussian kernel.

![GLD 5Y Returns](/images/risk-2-prob-dists.png)

#### (2) Estimate VaR
For 99% confidence level,
$1 - \alpha = 0.99$, so
$\alpha = 0.01$. Under the parametric models, 
VaR can be easily found using the closed-form equations:
$$
    \text{VaR}_{1-\alpha} = -(\mu + \sigma \cdot z_\alpha),
    \quad \text{VaR}_{1-\alpha} = -(\mu + \sigma \cdot t_{\nu, \alpha})\text{,}
$$
where $z_\alpha$ and $t_{\nu, \alpha}$ are the
standard lower $\alpha$-quantiles. For the non-parametric model,
numerically compute the quantile.

![GLD 5Y Returns](/images/risk-3-vars.png)

#### (3) Backtest VaR
There's a clever 
way to backtest the $\text{VaR}_{1-\alpha}$ values.
The VaR tells us that 
$\mathbb{P}(X_i \leq -\text{VaR}_{1-\alpha}) = \alpha$.
So we define a breach of the VaR level as
$$
    U_i = \mathbf{1}_{X_i \leq -\text{VaR}_{1-\alpha}}(X_i),
$$
and assume
$U_i \overset{\text{i.i.d.}}{\sim} \text{ Bernoulli}(p)$.
Then define the number of breaches as
$$
    Y = \sum_{i=1}^{n} U_i,
$$
with
$Y \sim \text{ Binomial}(n, p)$.
Finally, for $Y$, we test ${\text{H}_0: p = \alpha}$ against
${\text{H}_1: p \neq \alpha}$ using the likelihood
ratio test statistic: ${-2 \ln \lambda \sim \chi^2_1}$,
where $\lambda$ is the likelihood ratio. [[3](#note-3)]

Note that at each step we've simplified 
the problems and
assumed stuff. Simplifications like a single-asset portfolio
aren't practical. And several of the assumptions
like daily returns being i.i.d., or returns
following a normal distribution, or historical returns 
being representative of future returns, don't hold empirically.


&nbsp;

<span class="invisible absolute" id="notes"></span>
### Notes
<span class="invisible absolute" id="note-1"></span>
[1] The full Jupyter notebook that
reproduces the graphs and computations
is [here](https://github.com/siddharthskulkarni/market-risk/blob/main/workflow.ipynb).

<span class="invisible absolute" id="note-2"></span>
[2] Log-returns help because they're additive,
i.e., for multiple time 
periods they can simply be added together
to get log-returns over the combined period.
They're also numerically stable since
logs of very small numbers close to zero are large negative
numbers.

<span class="invisible absolute" id="note-3"></span>
[3] This use of the likelihood ratio test
is known as the Kupiec Proportion of Failures (PoF) test.

&nbsp;

<span class="invisible absolute" id="references"></span>
### References
[1] Mathworks. _Value-at-Risk Estimation and Backtesting_. [https://www.mathworks.com/help/risk/value-at-risk-estimation-and-backtesting.html](https://www.mathworks.com/help/risk/value-at-risk-estimation-and-backtesting.html).

<span class="invisible absolute" id="ref-2"></span>
[2] _Market Risk_. [https://github.com/siddharthskulkarni/market-risk/blob/main/workflow.ipynb](https://github.com/siddharthskulkarni/market-risk/blob/main/workflow.ipynb).