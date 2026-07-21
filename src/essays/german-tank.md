---
title: "The German Tank Problem"
excerpt: ""
date: "2026-07-21"
type: "math"
tags: ["math", "stat", "puzzle"]
---

I first heard of the [German Tank problem](https://en.wikipedia.org/wiki/German_tank_problem) in [this EiE episode](https://www.youtube.com/watch?v=tKYKybyH0TU), but didn't think about it until recently, when it landed in my inbox as a question.

![](/images/german-tank-1.png)

Essentially, we need to estimate the parameter of a discrete uniform distribution. A direct way to go about it is simply maximizing the likelihood, and correcting the estimator for bias. But one can also come up with intuitive heuristic estimators based on the gaps (as mentioned in the episode). As you'll see, it turns out that one such estimator exactly matches the unbiased MLE estimator.

For the first method, let's consider an incorrect but simpler case to understand the approach: Suppose the tanks are numbered independently but with replacement. That is, assume the tank numbers $U_i$ are iid random variables from the discrete uniform distribution $U(1, N)$ for $i = 1, \ldots, n$. Then we have the likelihood
$$
\begin{align*}
    L(N \mid \mathbf{u}) &= \left(\frac{1}{N}\right)^n\mathbb{I}_{N \geq U_{(n)}}.
\end{align*}
$$

The likelihood is always decreasing in $N$, so the maximum is obtained at $\hat{N}_{MLE} = U_{(n)}$. Since there's always the possibility of observing values greater than $U_{(n)}$, this estimator would tend to underestimate $N$. To verify, get the CDF for $U_{(n)}$
$$
\begin{align*}
    F(k) &= \mathbb{P}(U_{(n)} \leq k) \\
    &= \mathbb{P}(U_1 \leq k, \ldots, U_n \leq k) \\
    &= \left(\frac{k}{N}\right)^n,
\end{align*}
$$
then the PMF
$$
\begin{align*}
    f(k) &= F(k) - F(k - 1) \\
    &= \left(\frac{k}{N}\right)^n - \left(\frac{k - 1}{N}\right)^n,
\end{align*}
$$
and the expected value
$$
\begin{align*}
    \mathbb{E}[U_{(n)}] &= \sum_{k = 1}^{N} kf(k) \\
    &= N - \sum_{k=1}^{N-1}\left(\frac{k}{N}\right)^n \\
    &\leq N.
\end{align*}
$$

Note that it indeed underestimates $N$. So it makes sense to add a correction to this estimator.

Now that we have the recipe, consider the actual, without-replacement model. Let $X_i$ be the tank numbers, with each sample point $\mathbf{x}$ equally likely. So there are $\binom{N}{n}$ sample points, and the PMF is
$$
\begin{align*}
    f(\mathbf{x}) &= \frac{1}{\binom{N}{n}}.
\end{align*}
$$

We try to estimate $N$ via MLE. The likelihood is
$$
\begin{align*}
    L(N\mid\mathbf{x}) &= \frac{1}{\binom{N}{n}}\mathbb{I}_{N \geq X_{(n)}},
\end{align*}
$$
the same form as the previous case, so again $\hat{N}_{MLE} = X_{(n)}$. To get the bias, compute the PMF by counting the sample points with the maximum fixed at $k$
$$
\begin{align*}
    f(k) &= \mathbb{P}[X_{(n)} = k] \\
    &= \frac{\binom{k - 1}{n - 1}}{\binom{N}{n}},
\end{align*}
$$
and then the expectation
$$
\begin{align*}
    \mathbb{E}[X_{(n)}] &= \sum_{k = n}^{N} kf(k) \\
    &= \sum_{k = n}^{N} k \frac{\binom{k - 1}{n - 1}}{\binom{N}{n}} \\
    &= \frac{n}{\binom{N}{n}} \sum_{k = n}^{N} \frac{k}{n} \binom{k - 1}{n - 1} \\
    &= \frac{n}{\binom{N}{n}} \sum_{k = n}^{N} \binom{k}{n} \\
    &= \frac{n}{\binom{N}{n}} \binom{N + 1}{n + 1} \\ \tag{using the hockey-stick identity} \\
    &= \frac{n}{n + 1}(N + 1).
\end{align*}
$$

Rearranging the above expression, the corrected estimator is
$$
\hat{N} = X_{(n)}\left(\frac{n + 1}{n}\right) - 1.
$$

Finally, we use an intuitive heuristic approach. If we arrange the order statistics $X_{(i)}$ on the number line from $1$ to $N$, and look at the $n + 1$ gaps containing the missing numbers
$$
\begin{align*}
    Y_1 &= X_{(1)} - 1, \\
    Y_2 &= X_{(2)} - X_{(1)} - 1, \\
    Y_3 &= X_{(3)} - X_{(2)} - 1, \\
    &\;\;\vdots \\
    Y_{n+1} &= N - X_{(n)},
\end{align*}
$$
a way to estimate $N$ is to multiply the average size of the (observed) gaps by ${n + 1}$ and add the count of the observed values $n$; i.e.
$$
\hat{N} = (n + 1)\bar{Y} + n,
$$
where $\bar{Y} = \frac{1}{n}\sum_{i=1}^{n} Y_i$. This gives
$$
\begin{align*}
    \hat{N} &= (n + 1)\bar{Y} + n \\
    &= \left(\frac{n + 1}{n} \sum_{i=1}^{n}Y_i\right) + n \\
    &= \left(\frac{n + 1}{n}\right)(X_{(n)} - n) + n \\
    &= X_{(n)}\left(\frac{n + 1}{n}\right) - 1,
\end{align*}
$$
the same as the previous answer. [[1]](#note-1)

There can be other such heuristic estimators, for example you could add the average of the gaps to the maximum order statistic: ${\hat{N} = X_{(n)} + \bar{Y}}$. That'd require slightly different definitions for the gaps, and wouldn't necessarily be unbiased or efficient.

&nbsp;

<span class="invisible absolute" id="notes"></span>
#### Notes
<span class="invisible absolute" id="note-1"></span>
[1] This estimator is, in fact, the MVUE (minimum variance unbiased estimator).

&nbsp;

<span class="invisible absolute" id="references"></span>
#### References
<span class="invisible absolute" id="ref-1"></span>
[1] Miller, Steven J. 2021. [“Lessons from the German Tank Problem.”](https://web.williams.edu/Mathematics/sjmiller/public_html/math/papers/GTPv10.pdf) Williams College.
