---
title: "Mathematics of Linear Regression"
excerpt: ""
date: "2025-07-10"
type: "math"
tags: ["math", "stat"]
---

We make sense of the world by making connections. Given $x$ and $y$, we always try to solve for $f$ such that $y=f(x)$.

Often, the best we can do is solve for $y \approx f(x)$. Sometimes we have reasons to believe that $f$ has a specific form (linear, polynomial, or trigonometric); other times, it's useful to assume so (say, for approximating a complicated non-linear function). A subclass of such problems — approximating $y$ as a _linear_ function of $x$ — is the object of this essay.

Suppose we gather data: $x_i$, $y_i$ for ${i = 1, 2,  \ldots, n}$. And for a particular $x_i,$ we guess $y_i$ as:
$$
\begin{align*}
y_i \approx \beta_0 + \beta_1x_i.
\end{align*}
$$

The problem is reduced to choosing the "best" values of $\beta_0$, $\beta_1$. Best in the sense that, based on our data, our guesses are as "close" to the actual values as possible. So, if we have a measure of distance, we simply choose betas such that the total distance between our guesses and the actual values is the least. I.e. we minimize the error. [[1](#note-1)]

Define the vectors $\mathbf{y} = (y_1, \ldots, y_n)^T \in \mathbb{R}^n$, $\mathbf{\beta} = (\beta_0, \beta_1)^T \in \mathbb{R}^2$, and define the $n \times 2$ matrix
$$
X = \begin{pmatrix}
    1 & x_1 \\
    \vdots & \vdots \\
    1 & x_n
\end{pmatrix}.
$$

$X\beta$ is the vector of our guesses, and the range of $X$ : ${\{X\alpha: \alpha \in \mathbb{R}^{n \times 2}\}}$ is a subspace of $\mathbb{R}^n$. So, we are approximating $\mathbf{y}$ in the subspace $X\beta$.

Define the [inner-product](https://en.wikipedia.org/wiki/Inner_product_space#Definition) on $\mathbb{R}^n$:
$$
\begin{align*}
\langle u, v\rangle &:= \sum_{i = 1}^n u_i v_i
= v^tu.
\end{align*}
$$
This inner-product induces the [Euclidean norm](https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm):
$$
\begin{align*}
\|u\|_2 := \sqrt{\langle u, u\rangle} = \sqrt{\sum_{i = 1}^n u_i^2} \,.
\end{align*}
$$
A [norm](https://stackoverflow.com/questions/55116028/what-is-the-difference-between-a-metric-and-a-norm) defines the length of a vector, and also gives a notion of distance. The distance between two vectors $u$ and $v$ is the length of the vector $u - v$ or $v - u$; i.e. $\|u - v\|_2$.

With this measure of distance, we solve for $\beta$:
$$
\begin{align*}
\beta &= \arg \min_\beta \|\mathbf{y} - X\beta\|_2 \\
&= \arg \min_{\beta_0, \beta_1} \sqrt{\sum_{i = 1}^n (y_i - (\beta_0 + \beta_1x_i))^2} \\
&= \arg \min_{\beta_0, \beta_1} \sum_{i = 1}^n (y_i - (\beta_0 + \beta_1x_i))^2 \,.
\tag{1}
\end{align*}
$$
This optimization problem is the last bit of our puzzle. Analytically, there are two ways to approach it.

Suppose $\beta = \hat{\beta}$ is optimal. Then it is a fact that the vector ${\mathbf{y} - X\hat{\beta}}$ is orthogonal to the subspace $X\beta$. That is, ${y - X\hat{\beta}}$ is orthogonal to $X\alpha$ for all ${\alpha \in \mathbb{R}^{n \times 2}}$; their inner-product is $0$:
$$
\begin{align*}
&\,\,\,\langle \mathbf{y} - X\hat{\beta}, X\alpha \rangle = 0 \\ 
\Leftrightarrow &\,\,\, (X\alpha)^t(\mathbf{y} - X\hat{\beta}) = 0 \\ \tag{\small{by definition of inner-product}} \\ 
\Leftrightarrow &\,\,\, \alpha^tX^t\mathbf{y} = \alpha^tX^tX\hat{\beta} \\ \tag{\small{using property of transpose}} \\ 
\Leftrightarrow &\,\,\, X^tX\hat{\beta} = X^t\mathbf{y} \\
\Leftrightarrow &\,\,\, \hat{\beta} = (X^tX)^{-1}X^t\mathbf{y}.
\end{align*}
$$
And we get the minimizer $\hat{\beta}$. Although in practice, inverting large $X^tX$ type matrices is difficult. [[2](#note-2)]

The other way is to directly solve the optimization problem using calculus. Let
$$
\begin{align*}
f(\beta_0, \beta_1) &= \sum_{i=1}^{n}(y_i - \beta_0 - \beta_1x_i)^2.
\end{align*}
$$
If we hold $\beta_1$ constant, $f$ is quadratic in $\beta_0$ with a positive leading coefficient. So, for any value of $\beta_1$, $f$ has a unique minimum in $\beta_0$, which is easily calculated by $\frac{\partial f}{\partial \beta_0} = 0$:
$$
\begin{align*}
& \sum_{i=1}^{n} -2(y_i - \beta_0 - \beta_1x_i) = 0 \\
&\implies n\beta_0 = \sum_{i=1}^{n} (y_i - \beta_1x_i) \\
&\implies \beta_0 = \bar{y} - \beta_1\bar{x}. \\ \tag*{($\bar{y} = \frac{\sum y_i}{n}, \bar{x} = \frac{\sum x_i}{n}$)} \\
\end{align*}
$$
Plugging this value for $\beta_0$ back in $f$, we now get a quadratic in $\beta_1$ with a positive leading coefficient:
$$
\begin{align*}
g(\beta_1) &= \sum_{i=1}^n ((y_i - \bar{y}) - \beta_1(x_i - \bar{x}))^2.
\end{align*}
$$
This too has a unique minimum in $\beta_1$, so set ${\frac{\partial g}{\partial \beta_1} = 0}$:
$$
\begin{align*}
& \sum_{i=1}^{n} -2[(y_i - \bar{y}) - \beta_1(x_i - \bar{x})](x_i - \bar{x}) = 0 \\
& \implies \beta_1 = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2}.
\end{align*}
$$
And we get optimal betas.

So far, mathematically speaking, we have found the best approximation to a system of equations which has more equations than unknown variables; i.e. an overdetermined system. In practical applications, this is not enough. When we're guessing something, we like to qualify how good our guess is; we like to assign it some probability.

To do that, we consider a more statistical approach. Of course, for the gain of assigning probabilities, we bear the cost of more assumptions.

Let $x$ be a known parameter, $\beta_0$, $\beta_1$, and $\sigma^2$ be unknown parameters, and $Y$ and $\epsilon$ be random variables and such that:
$$
\begin{align*}
Y &= \beta_0 + \beta_1x + \epsilon \text{,} \\
Y &\sim \mathcal{N}(\beta_0 + \beta_1x, \sigma^2) \text{, } \\
\epsilon &\sim \mathcal{N}(0, \sigma^2).
\end{align*}
$$
Note:
$$
\begin{align*}
E[Y] &= \beta_0 + \beta_1x \text{, }\\
\text{Var}(Y) &= \text{Var}(\epsilon) = \sigma^2.
\end{align*}
$$

The data is a random sample from $Y$; i.e. $Y_i$ are [i.i.d.](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables) and so are $\epsilon_i$:
$$
\begin{align*}
Y_i &= \beta_0 + \beta_1x_i + \epsilon_i.
\end{align*}
$$

The values of the unknown parameters are found using [Maximum Likelihood Estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation):
$$
\begin{align*}
L(\mathbf{y}|\mathbf{x}, \mathbf{\beta}, \sigma^2) &= \prod_{i=1}^{n} \frac{1}{\sqrt{2\pi \sigma^2}} e^{\frac{-1}{2\sigma^2}(y_i - (\beta_0 + \beta_1x_i))^2} \\
&= (2\pi \sigma^2)^{\frac{-n}{2}} e^{\frac{-1}{2\sigma^2}\sum_{i=1}^{n}(y_i - (\beta_0 + \beta_1x_i))^2} \text{, } \\
l(\mathbf{y}|\mathbf{x}, \mathbf{\beta}, \sigma^2) &= -\frac{n}{2} \log(2\pi) - \frac{n}{2} \log(\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^{n}(y_i - (\beta_0 + \beta_1x_i))^2.
\end{align*}
$$

Holding $\sigma^2$ constant, we need to minimize the summation term. But we've already done the same above and have the results. So we simply maximize $l$ in $\sigma^2$ setting $\frac{\partial l}{\partial \sigma^2} =  0$:
$$
\begin{align*}
-\frac{n}{2\sigma^2} - \frac{1}{2(\sigma^2)^2}\sum_{i=1}^{n}(y_i - (\hat{\beta_0} + \hat{\beta_1}x_i))^2 = 0 \\
\implies \hat{\sigma^2} = \frac{1}{n} \sum_{i=1}^{n}(y_i - (\hat{\beta_0} + \hat{\beta_1}x_i))^2.
\end{align*}
$$

Since we have the estimators $\hat{\beta_0}, \hat{\beta_1}$ and $\hat{\sigma^2}$, we can make confidence intervals for our guesses. So, we have an idea of how good the guesses will be assuming that our model is correct. 

What can tell us if the model itself is any good? Decomposing the variance:
$$
\begin{align*}
\sum_{i=1}^n (y_i - \bar{y})^2 &= \sum_{i=1}^n (y_i - \hat{y_i} + \hat{y_i} - \bar{y})^2 \\
&= \sum_{i=1}^n (y_i - \hat{y_i})^2 + \sum_{i=1}^n (\hat{y_i} - \bar{y})^2. 
\end{align*}
$$
The first term above is the residual sum of squares and represents the total error of our model. But the second — the regression sum of squares — represents the variation explained by our model. Define:
$$
\begin{align*}
R^2 &= \frac{\sum (\hat{y_i} - \bar{y})^2}{\sum (y_i - \bar{y})^2}.
\end{align*}
$$
$R^2$ is the fraction of the variation in the data explained by that in the model. Higher the $R^2$, better the model.

Broadly, Regression has two types: Parametric (assumes a functional form) and Non-Parametric (no functional assumptions). This essay was about Linear Regression — a specific type of parametric regression, where the assumed functional form is linear in the _parameters_.

&nbsp;

#### Notes
<span class="invisible absolute" id="note-1"></span>
[1] Actually, the problem is again to choose the "best" measure of distance (instead of "a" measure). This usually depends on the problem to be solved. $L^1$, $L^2$, [$L^p$](https://en.wikipedia.org/wiki/Lp_space#Preliminaries) or a combination of them are commonly used. For example, [Lasso](https://en.wikipedia.org/wiki/Lasso_(statistics)#Basic_form), or [Ridge](https://en.wikipedia.org/wiki/Ridge_regression#Tikhonov_regularization). 

<span class="invisible absolute" id="note-2"></span>
[2] $X^tX$ are special kinds of matrices called [symmetric positive definite (SPD)](https://en.wikipedia.org/wiki/Definite_matrix#Definitions). Inverting SPD matrices is more generally connected with optimization problems.

&nbsp;

#### References
[1] Casella, G., & Berger, R. L. (2002). _Statistical Inference_ (2nd ed.). Duxbury Press, Pacific Grove, CA.




<!-- If you are a physicist, you might want to know how the quantum state of a particle changes with time; if you are an economist, you might want to know the relation between inflation and unemployment. But if you are a fixed-income quant, you might
merely want to calculate yields by estimating the Nelson-Siegel model. -->