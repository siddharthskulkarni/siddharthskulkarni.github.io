---
title: "Mathematics of Linear Regression"
excerpt: "and estimating the term structure of interest rates using the Nelson-Siegel model."
date: "2025-07-10"
tags: ["math", "stats"]
---

We make sense of the world by making connections between things. So, given $x$ and $y$, we always try to solve for $f$ such that $y=f(x)$. 

If you are a physicist, you might want to know how the quantum state of a particle changes with time; if you are an economist, you might want to know the relation between inflation and unemployment. But if you are a fixed-income quant, you might
merely want to calculate yields by estimating the Nelson-Siegel model.

Often, there are reasons to believe that $f$ is linear. Sometimes it's even useful to assume so (say, for approximation).
$$
\begin{align*}
y &= \beta_0 + \beta_1 x.
\end{align*}
$$

Suppose you want to know how two quantities,
$x$ and $y$, are related to each other; and you gather some data:
$$
\begin{align*}
(x_i, y_i) \text{ for } i=1,\ldots,n.
\end{align*}
$$


This is the problem
then the problem becomes finding the "best" values for $\beta_0$
and $\beta_1$.

Best in the sense that our prediction $\hat{y_i}$ given $x_i$:
$$
\begin{align*}
\hat{y_i}= \beta_0 + \beta_1 x_i,
\end{align*}
$$
should be as "close" to the observed $y_i$ as possible. So with a measure of distance in the $(x, y)$ space, we can choose the betas such that the total error is minimized. The square of the vertical distance between points is one commonly used measure.

From the vague problem of "modelling the relationship between $x$ and $y$", we have the concrete problem: find betas such that the sum of squares of the vertical distance between $(x_i, y_i)$ and
$(x_i, \hat{y_i})$ is minimized. In other words, our problem is to solve:
$$
\begin{align*}
\arg \min_{\beta_0, \beta_1} \sum_{i=1}^n (y_i - (\beta_0 + \beta_1 x_i))^2.
\end{align*}
$$

Standing on the shoulds of giants, this can be solved in many ways: using multi-variable calculus, or by some algebraic manipulation followed by single-variable calculus, or using linear alebra, or
even numerical methods from a package like scipy.

The solution is:
$$
\begin{align*}
\beta_1 = \frac{S_{xy}}{S_{xx}} \,\text{, } \beta_0 = \bar{y} - \beta_1\bar{x}.
\end{align*}
$$

Although simple, this approach has limitations. For out-of-sample $x_i$ there is no way to know how good the prediction $y_i$ is; meaning there are no probabilities (confidence intervals) to qualify our predictions.

This leads to the statistical approach to this. Let $Y_i$s be a random sample from and let $x_i$ be known values. Then,
$$
\begin{align*}
Y_i &= \beta_0 + \beta_1x_i + \epsilon_i\text{, }
\end{align*}
$$
where $\epsilon_i$ are also iid random variables. Also assume
$E[\epsilon_i] = 0$ and $\text{Var}[\epsilon_i] = \sigma^2$. Then,
$E[Y_i] = \beta_0 + \beta_1x_i$, and $\text{Var}[Y_i] = \sigma^2$.
$$
$$



#### Notes
[1] More generally, between $f(x)$ and $g(y)$.




