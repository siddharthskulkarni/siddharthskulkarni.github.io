
To keep things simple, let's talk about a call option $C$ on a stock $S$ expiring at $T$. The main ideas behind pricing such derivatives are _replication_ and _no-arbitrage_. If you put together a portfolio $\Pi$:

1. that has the same payoff as $C$ at $T$, 
2. rebalance it at every instant so it _continues_ to match the payoff of $C$ at $T$, i.e. $\Pi_T = C_T$ at any $t$, without additional cost,
3. and suppose _no-arbitrage_, 

then the value of $C$ must equal the value of $\Pi$ at all times: $C_t = \Pi_t$.

Now the problem is to figure out $\Pi_t$ instead of $C_t$. For this, we need a model for the underlying $S$.

Consider the one-period binomial model. At time $t=0$, the stock price is $S$. At the end of the period, $t=1$, the stock can take one of two values: $uS$ in the up state and $dS$ in the down state, where typically $0 < d < 1 < \exp(r) < u$, $r$ being the continuously compounded risk-free interest rate. Denote the call's payoff by $C_u$ in the up state and $C_d$ in the down state. For some exercise price $X$
$$
\begin{align*}
C_u &= \max(uS - X, 0) \; \text{and} \\
C_d &= \max(dS - X, 0).
\end{align*}
$$

Following the above argument, construct a portfolio $\Pi$ of $\Delta$ shares of the stock and $B$ dollars in the risk-free money account. Its value at $t=0$ is $\Pi_0 = \Delta S + B$ and at $t=1$, it's $\Pi_u = \Delta uS + Be^r$ in the up state, and $\Pi_d = \Delta dS + Be^r$ in the down state.

Choose $\Delta$ and $B$ so that the portfolio replicates the option: $\Pi_u = C_u$ and $\Pi_d = C_d$. Thus,
$$  
\begin{align*}  
\Delta uS + Be^r &= C_u, \\  
\Delta dS + Be^r &= C_d.  
\end{align*}  
$$

Solving for $\Delta$ by subtracting the second equation from the first gives
$$
\begin{align*}
\Delta (u-d)S &= C_u-C_d \\
\Rightarrow \Delta &= \frac{C_u-C_d}{(u-d)S}.  
\end{align*}
$$

Substituting this into either of the two equations gives
$$  
B = e^{-r}\left(\frac{uC_d-dC_u}{u-d}\right).  
$$

Therefore, the value of the replicating portfolio at $t=0$ is
$$  
\begin{align*}  
\Pi_0  
&= \Delta S+B \\  
&= \frac{C_u-C_d}{u-d} 
+e^{-r}\frac{uC_d-dC_u}{u-d}.  
\end{align*}  
$$

With some algebra,
$$
\Pi_0 = e^{-r}  
\left[  
\frac{e^r-d}{u-d}C_u  
+ 
\frac{u-e^r}{u-d}C_d  
\right].  
$$

Now, define

$$  
q=\frac{e^r-d}{u-d}.  
$$
Since $d<e^r<u$, we have $0<q<1$, and

$$  
1-q=\frac{u-e^r}{u-d}.  
$$

That is,
$$  
\begin{align*}
\Pi_0 &= e^{-r}\left(qC_u+(1-q)C_d\right) \\
&= \mathbb{E}^{\mathbb{Q}}[e^{-r}\,\Pi_1].
\end{align*}
$$

By no-arbitrage, as mentioned, the option must have the same value as its replicating portfolio:
$$  
C_0=\Pi_0= \mathbb{E}^{\mathbb{Q}}[e^{-r}\,\Pi_1].  
$$

So, a self-financing, replicating portfolio $\Pi$, the no-arbitrage assumption, _and_ our model allowed us to define a new probability measure $\mathbb{Q}$ under which the price of $C$ — by replication, dynamic-hedging, and no-arbitrage — came out as an expectation.

Note that $\Pi$ isn't risk-free; it has the same risk or same exposure to the risky underlying $S$ as $C$. And remember, the fundamental way to price any asset is by discounting its expected cash flows using a _suitable_ rate. Suitable in the sense that it reflects the riskiness of the asset and your risk preference (or the equilibrium expected return like $\beta$ from CAPM). But, despite $\Pi$ being risky, the above formula is _just_ the expected value discounted at the risk-free rate without any risk premium: as if all investors were risk-neutral, expecting only the risk-free rate from _any_ (risk-free or risky) asset. Hence the name risk-neutral measure.

The more interesting question is why and how no-arbitrage, replication and completeness, and risk-neutral measures are related.

&nbsp;

<span class="invisible absolute" id="notes"></span>
#### Notes
<span class="invisible absolute" id="note-1"></span>
[1] My understanding is essentially a combination of the top two answers on this [thread](https://quant.stackexchange.com/questions/55239/explaining-the-risk-neutral-measure).

&nbsp;

<span class="invisible absolute" id="references"></span>
<!-- #### References
<span class="invisible absolute" id="ref-1"></span> -->
