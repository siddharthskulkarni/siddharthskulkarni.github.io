
Usually, it makes sense to consider the data as a random sample; i.e. independent and identically distributed. Then one can model the distribution and do testing, confidence intervals, or regressions.

But in the case of data ordered in time, say intraday stock prices, the points in the sample are often neither independent nor identically distributed. So if we let the collection of random variables $\{X_t\}_{t=0}^T$ denote the data, a complete description is given by the joint distribution $F_{X_0, \ldots, X_T}$. And that is impossible to estimate given we have a sample with a single point ($N = 1$).

To make the problem well-posed, we must impose some regularity conditions. For this we need the following definitions.

Let $\{X_t\}$ be a collection of time-indexed, real-valued random variables with the joint distribution
$$
    F_{X_0, \ldots, X_T}(x_0, \ldots, x_T) = \mathbb{P}(X_0 \leq x_0, \ldots, X_T \leq x_T).
$$

**_Def (Mean function)_**: The mean function is defined as
$$
    \mu(t) = \mathbb{E}[X_t]
$$
for all $t$, if the expectations exist.

**_Def (Autocovariance function)_**: The autocovariance function is defined as
$$
    \gamma(s, t) = \mathbb{E}[(X_s - \mathbb{E}[X_s])(X_t - \mathbb{E}[X_t])]
$$
for all $s$ and $t$.

**_Def (Autocorrelation function)_**: The autocorrelation function is defined as
$$
    \rho(s, t) = \frac{\gamma(s, t)}{\sqrt{\gamma(s, s)\gamma(t, t)}}
$$
for all $s$ and $t$.

Now we can talk about the regularity conditions.

A series is _strongly/strictly_ stationary if the joint distribution of any subcollection is the same as that of the shifted subcollection. Meaning the joint distribution depends only on the time differences rather than the actual times.

**_Def (Strong/Strict stationarity)_**: A time series $\{X_t\}_{t=0}^T$ is said to be strongly/strictly stationary iff
$$
    F_{X_{t_1}, \ldots, X_{t_k}} = F_{X_{t_1 + h}, \ldots, X_{t_k + h}}
$$
for all $0 \leq t_1 \ldots \leq t_k \leq T$ and $h \geq 0$.

Note that this means the $X_i$'s are (marginally) identically distributed, but not that they're necessarily independent. For example, let ${X \sim \mathcal{N}(0, 1)}$ and let ${X_k = (-1)^kX}$ for $k \in \mathbb{N}$. Then $X_k$'s are identically distributed but not independent, and the series is strongly stationary. So iid implies strong stationarity but it's not true the other way around.

This theoretical constraint is too strong to apply to the real world. Plus,it's hard to test. So we need a weaker, more practical condition. 

**_Def (Weak stationarity)_**: A time series $\{X_t\}_{t=0}^T$ is weakly stationary if the mean is constant and autocovariance depends only on the lag. So
$$
    \mu(t) = \mu
$$
for all $t$, and
$$
    \gamma(s, t) = \gamma(|s - t|)
$$
for all $s, t$.

Instead of constraining the marginal distributions, we only control their first and second moments. 

Note that strong stationarity implies weak stationarity. Also, when we talk about stationarity, it's weak stationarity in particular. Now let's consider a few classic examples.

**_Eg. (White Noise)_**: Let $W_t$ be independent random variables with mean $0$ and variance $\sigma^2$. Then $\mu(t) = 0$ for all $t$ and
$$
\begin{align*}
    \gamma(s, t) 
    &= \mathbb{E}[W_sW_t] \\
    &= \mathbb{E}[W_s]\mathbb{E}[W_t] \\
    &= \begin{cases}
        \sigma^2, & s = t \\
        0, & s \neq t.
    \end{cases}
\end{align*}
$$

Clearly this series is (weakly) stationary. Instead, if we suppose that $W_t$ are i.i.d. standard normal, then
$$
\begin{align*}
    f_{W_{t_1}, \ldots, W_{t_k}} 
    = \prod f_{W_0} = f_{W_{t_1 + h}, \ldots, W_{t_k + h}},
\end{align*}
$$
and the series becomes strongly stationary too.

**_Eg. (Moving Average)_** Let $W_t$ be mean $0$ variance $\sigma^2$ white noise variates and let $X_t = \frac{W_{t-1} + W_t}{2}$. Then
$$
    \mu(t) = \mathbb{E}[X_t] = \frac{1}{2} (\mathbb{E}[W_{t-1}] + \mathbb{E}[W_t]) = 0
$$
for all $t$, and
$$
    \gamma(s, t) = \begin{cases}
        \frac{\sigma^2}{2}, & s = t \\
        \frac{\sigma^2}{4}, & |s - t| = 1 \\
        0, & |s - t| > 1
    \end{cases}
$$
for all $s$, $t$. Since $\gamma$ depends only on $|s - t|$, this series is also stationary.

**_Eg. (Random Walk)_** Let $W_t$ be mean $0$ variance $\sigma^2$ white noise variates and let $X_t = X_{t-1} + W_t$ with $X_0 = 0$, which gives $X_t = \sum_{i=1}^t W_i$. Then the mean function is
$$
    \mu(t) = \mathbb{E}[X_t] = 0
$$
for all $t$, and
$$
    \gamma(s, t) = \mathbb{E}[X_s X_t] = \min(s, t) \sigma^2,
$$
for all $s$, $t$. Since $\gamma$ depends on both $s$ and $t$ and not just their difference, this series is not weakly stationary. In fact in some sense this is a quintessential example of a non-stationary process since it's used to test data for stationarity — c.f. [Augmented Dickey-Fuller test](https://en.wikipedia.org/wiki/Augmented_Dickey%E2%80%93Fuller_test).

![Examples](/images/time-series-1-examples.png)


&nbsp;

### References
[1] Shumway, R. H., & Stoffer, D. S. (2017). _Time Series Analysis and Its Applications: With R Examples_ (4th ed.). Springer, Cham, Switzerland.