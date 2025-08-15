---
title: "Computing Bond Yields"
excerpt: "using numerical methods like Bisection and Newton's Method."
date: "2025-07-09"
type: "math"
tags: ["bonds", "finance", "math"]
---

All [bonds](https://en.wikipedia.org/wiki/Bond_(finance)) are not created equal. There may be many differences: The borrowing party may be the US government, or the World Bank, or a company like Apple. The borrowed amount
could be in millions of euros, or billions of dollars. It could be paid back all at the end of 10 years, or
partly every month for 30 years. The lender could have additional options, or the borrower more restrictions.

How can we then compare different bonds? The answer is: using Mathematics. 

Keeping only the most necessary and useful properties, and ignoring the rest: A bond is simply a promise to pay back certain amounts at certain times, and it can be traded in the market for a price.

Now, consider a bond: let $F$ be its face value, $C$ be the coupon payment, $T$ be the time periods to maturity
and $P$ be the market price. The yield to maturity $r$ is defined as the interest rate that solves the equation:
$$
\begin{align*}
    P &= \sum_{t=1}^{T} \frac{C}{(1+r)^t} + \frac{F}{(1+r)^T}. \tag*{(1)}
\end{align*}
$$

It is the discount rate which equates the present value of the bond's cash flows to its market price.
This assumes that (1) the bond is held to maturity, and (2) the issuer makes the coupon and principal payments as promised.

To think of $r$ as the return on the bond, it is also assumed that (3) the coupons are (or can be) reinvested at the yield:
$$
\begin{align*}
    P(1+r)^T &= \sum_{t=1}^{T} C(1+r)^{T-t} + F. \tag*{(2)}
\end{align*}
$$

The left hand side is the future value of an investment of $P$ at the yield $r$ for $T$ periods, 
and the right hand side is the future value of the cash flows from the bond with reinvestment
of coupons at the yield.

At the cost of a few assumptions, a single meaningful number $r$ can be used to compare very different bonds.

What's left now is actually solving for $r$. Not long after staring at the equations, you might realize the good news and the bad news. There are no weird $\sin$, $\cos$ or $\log$ terms, it's only a polynomial equation. But, unlike the quadratics from high school, it has no general closed-form solution (formula).

So, we turn to [Numerical Analysis](https://en.wikipedia.org/wiki/Numerical_analysis). The idea is to keep trying values of $r$ such that: (1) every attempt is _better_ than the previous one, (2) ultimately the LHS and the RHS are very _close_ (if not equal), and (3) all this happens reasonably _fast_.

Two such methods are the _Bisection Method_ and the _Newton's Method_. 

But before diving into them, note that solving for $r$ in equation (1) is the same as solving for $r$ in
$$
\begin{align*}
f(r) &= \sum_{t=1}^{T} \frac{C}{(1+r)^t} + \frac{F}{(1+r)^T} - P \\ &= 0. \tag*{(3)}  
\end{align*}
$$
Also, this $f(r)$ is decreasing in $r$. It looks like:
![](/images/bond-yields-1.png)

#### Bisection Method
In spirit, it's just like binary search. Start with $r_1$ and $r_2$ such that
$f(r_1) > 0$ and $f(r_2) < 0$. Then the interval $[r_1, r_2]$ definitely contains the root. Guessing initial values could be challenging, but in this case, $r_1 = 0$ and $r_2 = 1$ are easy choices.

1. Now, check the sign of $f\left(\frac{r_1 + r_2}{2}\right)$.
2. If it's positive, set $r_1:=\frac{r_1 + r_2}{2}$; if it's negative, set $r_2:=\frac{r_1 + r_2}{2}$.
3. Repeat steps 1 and 2 till $\left|f\left(\frac{r_1 + r_2}{2}\right)\right| < \epsilon$.

Here, $\epsilon$ is an error tolerance parameter decided by the user.


#### Newton's Method
Since $f''(r) > 0$, $f(r)$ is a [convex](https://en.wikipedia.org/wiki/Convex_function) function. The Newton's method exploits this artfully. Start with an
arbitrary value of $r=r_0$, then
1. Get the equation of the tangent to $f$ at $r_n$: ${y = f(r_n) + f'(r_n)(r - r_n)}$.
2. Get the r-intercept of this line; set $y := 0$, then ${r_{n+1} = r_n - \frac{f(r_n)}{f'(r_n)}}$.
3. Repeat steps 1 and 2 with $r = r_{n+1}$ till $\left|f(r_n)\right| < \epsilon$.

Again, $\epsilon$ is an error tolerance parameter. 

Newton's method is much faster (quadratic convergence) than bisection and hence used in practice:
![Newton's method vs Bisection](/images/bond-yields-2.png)

You can play around with the implementations using [numanpy](https://pypi.org/project/numanpy/), the code for which is [here](https://github.com/siddharthskulkarni/numanpy/blob/main/numanpy/root_finding.py). You can also look at the bond yield computation in [this](https://github.com/siddharthskulkarni/numanpy/blob/main/applications/fixed_income.ipynb) Jupyter Notebook.

&nbsp;