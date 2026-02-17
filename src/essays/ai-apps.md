---
title: "Notes on building AI apps"
excerpt: ""
date: "2026-02-16"
type: "misc"
tags: ["AI"]
---

<!-- Over the last week I began building
an AI agent to do a narrow task. My goal is to give an overview with a narrative that makes sense. -->

I was surprised to see, although quite late,
how the models can do so much with
clever engineering by the model companies
and open-source communities.

There are quite a few components that go into building
an AI application. I found it useful to outline them.

The LLMs are, of course, the brain of the app.
More precisely, they're like a part, or
combination of parts, of a human brain
that can use and manipulate language.
System messages, conversation history, user prompts,
and outputs make up a model's _context window_. 
Based on its "understanding" (weights of the neural network),
it repeatedly predicts the next token
conditioned on all the previous tokens in the window and generates
an output. 

It's interesting to think about what's a
good model for the models. [[1]](#note-1) More useful, though, for building apps is to focus on what a model can actually do.
Since the launch of ChatGPT, the models
have been able to do increasingly useful things,
instead of just answering simple questions. The trend is expected to continue. [[2]](#note-2) 

For example,
they can classify a given piece of text into categories,
solve Olympiad-level math and physics problems,
write code,
help with research, 
break down a complex task into steps,
and even know a lot about many fields.

Two very important additions are (1) _structured outputs_
and (2) _tool calling_.

Given the names and descriptions of fields,
models can produce structured JSON outputs.
If you specify that the response should contain title, date, and location, along with descriptions of what each field means, the model can generate the required JSON object. This makes it easier to use the model’s response in other non-LLM parts of the app.

Similarly, given the names and descriptions of tools, 
models can "figure" out if and when one needs to be used. If a tool with name add_event_to_calendar
and description "adds events to the user's calendar"
is passed to a model, it can, based on the prompt,
decide whether the tool needs to be used.
Tools can do specific things,
like calling an API or querying a database,
just like regular functions. Except, they need precise natural language descriptions for the models to understand, and they're called via structured outputs.

A model and tools make up an _agent_. [[3]](#note-3)
Based on the logic
of interaction between models and tools,
it's easy to imagine the app flow as a graph 
with nodes and edges. The nodes define the
computations (LLM calls and tool calls) and the edges decide
the flow between nodes. [[4]](#note-4)

Another important concept is that of _memory_.
The models respond based 
on the context window (which has increased a lot),
but for knowledge or long-term memory, they need to rely on databases.
Information can be stored in vector databases,
and accessed at runtime via tools to
generate a grounded response. [[5]](#note-5)

To share these tools and knowledge
in a standard way, [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) defines how models can talk to other services and tools. MCP servers are services which expose tools, prompt templates, and other resources like
data and file systems that can be used by MCP hosts
(AI apps).


&nbsp;

<span class="invisible absolute" id="notes"></span>
### Notes
<span class="invisible absolute" id="note-1"></span>
[1] Based on their
most popular use case so far — coding — it seems
they're like natural language compilers
that turn instructions in natural language
into executable code. From punching
in bits using cards, to
Fortran, to C, to Python, and now to
natural languages, we've climbed up the abstraction ladder. 

It's even argued
that, so far, they're our best approximations for human intelligence.
But they can also fail to answer simple logic
questions like this:

<img src="/images/ai-apps-1.png" alt="DeepSeek answers a logic question incorrectly" title="(I remember seeing this question in a reel but I can't find it to cite)">

<span class="invisible absolute" id="note-2"></span>
[2] Cf. [_Machines of Loving Grace_](https://darioamodei.com/essay/machines-of-loving-grace).

<span class="invisible absolute" id="note-3"></span>
[3] [LangChain](https://docs.langchain.com/oss/python/langchain/overview) is an open-source framework with classes and
methods to initialize and query LLMs,
and build simple agents. You can get the API keys
from model providers and use them to
start building with a few lines of code. It's also easy
to add custom tools.
An alternative to ChatGPT, Claude, or Gemini,
is [Ollama](https://ollama.com/) — an open-source
platform to access and run open models locally.

<span class="invisible absolute" id="note-4"></span>
[4] [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) is a low-level, graph-based, open-source framework
to build complex agent logic and multi-agent systems. It works using a _state_ object that's shared across the graph and used to handle the app flow.

<span class="invisible absolute" id="note-5"></span>
[5] Natural language inputs are embedded into high-dimensional vector spaces using embedding models, and then stored in vector
databases like [Pinecone](https://docs.pinecone.io/guides/get-started/overview). Search queries are also embedded in the same
space, results are returned based on vector similarity, and inserted in the context window. This is what's called [Retrieval-Augmented Generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation#Process).

<span class="invisible absolute" id="note-6"></span>
[6] [Prompt Engineering Guide](https://www.promptingguide.ai/techniques) is a useful resource for different prompting techniques and their pros and cons.

&nbsp;