import { useState, useEffect, useRef } from "react";
import {
  Send,
  Sparkles,
  User,
  Loader2,
  FileText,
  Download,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  hasJiraLink?: boolean;
  data?: {
    type?: "report" | "list" | "metric";
    content?: any;
  };
}

interface AIChatAssistantProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Role-based suggested prompts
const getRolePrompts = (role: string) => {
  const prompts = {
    collaborator: [
      {
        text: "Axet Gaia, show my current vacation balance",
        icon: "📊",
        category: "personal",
      },
      {
        text: "Axet Gaia, summarize my vacation consumption this year",
        icon: "📈",
        category: "personal",
      },
      {
        text: "Axet Gaia, when should I use my remaining vacation days?",
        icon: "💡",
        category: "personal",
      },
      {
        text: "Axet Gaia, show my vacation history",
        icon: "📋",
        category: "personal",
      },
    ],
    leader: [
      {
        text: "Axet Gaia, show pending approvals for my team",
        icon: "⏳",
        category: "team",
      },
      {
        text: "Axet Gaia, which team members have low vacation balance?",
        icon: "⚠️",
        category: "team",
      },
      {
        text: "Axet Gaia, summarize my team vacation usage",
        icon: "📊",
        category: "team",
      },
      {
        text: "Axet Gaia, detect inconsistencies in my team records",
        icon: "🔍",
        category: "validation",
      },
    ],
    administrator: [
      {
        text: "Axet Gaia, show system-wide vacation statistics",
        icon: "📊",
        category: "global",
      },
      {
        text: "Axet Gaia, detect data inconsistencies across all users",
        icon: "🔍",
        category: "validation",
      },
      {
        text: "Axet Gaia, generate a Q1 vacation report",
        icon: "📄",
        category: "reports",
      },
      {
        text: "Axet Gaia, show Jira-linked vacation records",
        icon: "🔗",
        category: "integration",
      },
    ],
  };

  return prompts[role as keyof typeof prompts] || prompts.collaborator;
};

// Role-aware AI responses
const getAIResponse = (
  userMessage: string,
  role: string,
): { text: string; hasJiraLink?: boolean } => {
  const lower = userMessage.toLowerCase();

  // Personal queries (Collaborator)
  if (lower.includes("my") && lower.includes("balance")) {
    return {
      text: `**Your Current Vacation Balance:**

• Total allocated days: **25 days**
• Days consumed: **15 days**
• Days remaining: **10 days**
• Accumulation started: **March 1, 2024**

**Recommendations:**
• You should plan to use your remaining days before November 30, 2025
• Consider scheduling time off during Q2 or Q3
• Your consumption rate is healthy at 60%

Would you like me to help you plan your remaining vacation days?`,
    };
  }

  if (
    lower.includes("my") &&
    (lower.includes("consumption") || lower.includes("usage"))
  ) {
    return {
      text: `**Your 2025 Vacation Summary:**

• Total days taken: **15 days** (60% of allocation)
• Average trip duration: **5 days**
• Longest vacation: **7 days** (December 2024)
• Shortest break: **2 days** (August 2024)

**Breakdown by period:**
• Q4 2024: 7 days
• Q3 2024: 5 days  
• Q2 2024: 3 days

**Status:** ✅ You're on track with healthy vacation consumption.`,
    };
  }

  if (lower.includes("history")) {
    return {
      text: `**Your Vacation History:**

**Completed:**
1. Dec 20-27, 2024 • 7 days • Remote
2. Aug 5-9, 2024 • 5 days • HQ Office
3. May 15-17, 2024 • 3 days • Remote

**Upcoming:**
1. Mar 10-14, 2025 • 5 days • Approved • Remote

**Pending:**
1. Apr 20-24, 2025 • 5 days • Awaiting manager approval

All records are validated and complete.`,
    };
  }

  // Team queries (Leader)
  if (
    role === "leader" &&
    lower.includes("pending") &&
    lower.includes("approval")
  ) {
    return {
      text: `**Pending Approvals for Your Team:**

**Urgent (>5 days waiting):**
• Michael Chen - Vacation • Feb 10-14 (5 days) • Submitted Jan 28

**Recent:**
• Emily Davis - Medical Leave • Feb 3-4 (2 days) • Submitted Jan 29
• Lisa Wang - Vacation • Mar 1-7 (7 days) • Submitted Jan 29

**Total:** 3 requests pending your review

⏱️ Average approval time for your team: 2.3 days
🎯 Recommended: Review urgent requests within 24 hours`,
    };
  }

  if (role === "leader" && lower.includes("low") && lower.includes("balance")) {
    return {
      text: `**Team Members with Low Vacation Balance:**

**Critical (<5 days):**
• David Lee - 5 days remaining (20/25 used) - 80% consumed
• James Miller - 3 days remaining (22/25 used) - 88% consumed

**Warning (<10 days):**
• Michael Chen - 10 days remaining (15/25 used) - 60% consumed

**Recommendation:**
Send reminders to David and James to schedule their remaining days before expiration.

Would you like me to draft reminder messages?`,
    };
  }

  if (
    role === "leader" &&
    lower.includes("team") &&
    (lower.includes("usage") || lower.includes("summary"))
  ) {
    return {
      text: `**Team Vacation Usage Summary:**

**Team:** Engineering (6 members)
**Total allocated:** 150 days
**Consumed:** 95 days (63%)
**Remaining:** 55 days (37%)

**By member:**
• Michael Chen: 10/25 remaining (60% used)
• Emily Davis: 17/25 remaining (32% used)
• David Lee: 5/25 remaining (80% used) ⚠️
• Lisa Wang: 12/22 remaining (45% used)
• James Miller: 3/25 remaining (88% used) 🔴
• Anna Smith: 16/28 remaining (43% used)

**Status:** 2 members need to schedule time off urgently.`,
    };
  }

  // Admin queries
  if (
    role === "administrator" &&
    lower.includes("system") &&
    lower.includes("statistics")
  ) {
    return {
      text: `**System-Wide Vacation Statistics:**

**Overall:**
• Total users: 248
• Total vacation days allocated: 6,250 days
• Days consumed: 4,188 days (67%)
• Days remaining: 2,062 days (33%)

**By department:**
• Engineering (89): 67% usage - Normal
• Sales (45): 82% usage - High ⚠️
• Marketing (38): 71% usage - Normal
• Finance (31): 45% usage - Low
• HR (22): 58% usage - Normal
• Operations (23): 76% usage - Normal

**Requests this month:**
• Approved: 142
• Pending: 11
• Rejected: 3

**System health:** ✅ All metrics within normal range`,
    };
  }

  if (lower.includes("inconsisten") || lower.includes("detect")) {
    const scope =
      role === "administrator"
        ? "system-wide"
        : role === "leader"
          ? "your team"
          : "your records";
    const count = role === "administrator" ? 3 : role === "leader" ? 1 : 0;

    return {
      text: `**Data Inconsistency Scan Results (${scope}):**

${
  count > 0
    ? `**Issues detected: ${count}**

${
  role === "administrator"
    ? `1. **David Lee** - Overlapping vacation dates with medical leave (Priority: High)
   - Vacation: Jan 30 - Feb 3
   - Medical Leave: Feb 1 - Feb 2
   - Action: Requires correction

2. **Sarah Chen** - Missing emergency contact (Priority: Medium)
   - Record incomplete since Dec 2024
   - Action: Request update

3. **2 employees** - Outdated address information (Priority: Low)
   - Last updated: 2023
   - Action: Verification needed`
    : role === "leader"
      ? `1. **Michael Chen** - Future vacation request overlaps with approved team leave
   - Both Michael and Emily scheduled Mar 10-14
   - Potential coverage gap
   - Action: Review and adjust if needed`
      : ""
}

All issues have been flagged for review.`
    : `✅ **No inconsistencies detected**

All records for ${scope} are complete and validated:
• No overlapping dates
• All required fields complete
• Documentation up to date
• Jira links verified

System integrity: 100%`
}

Last scan: ${new Date().toLocaleString()}`,
    };
  }

  if (lower.includes("report") || lower.includes("generate")) {
    return {
      text: `**Vacation Report Generated:**

**Period:** Q1 2025 (Jan 1 - Mar 31)
**Scope:** ${role === "administrator" ? "All departments" : role === "leader" ? "Engineering team" : "Personal records"}

**Summary:**
• Total requests: ${role === "administrator" ? "156" : role === "leader" ? "24" : "3"}
• Approved: ${role === "administrator" ? "142" : role === "leader" ? "21" : "2"}
• Pending: ${role === "administrator" ? "11" : role === "leader" ? "3" : "1"}
• Rejected: ${role === "administrator" ? "3" : role === "leader" ? "0" : "0"}

**Insights:**
• Average approval time: 2.1 days
• Most popular vacation period: March (Spring break)
• Department with highest usage: ${role === "administrator" ? "Sales (82%)" : "Engineering (67%)"}

**Report includes:**
✓ Detailed breakdowns by ${role === "administrator" ? "department" : "team member"}
✓ Leave type distribution
✓ Duration analysis
✓ Trend comparisons
✓ Jira integration data

The full report is ready for export.`,
      hasJiraLink: true,
    };
  }

  if (lower.includes("jira")) {
    return {
      text: `**Jira-Linked Vacation Records:**

**Total integrated records:** ${role === "administrator" ? "87" : role === "leader" ? "12" : "2"}

**Recent syncs:**
1. Michael Chen - Vacation Feb 10-14
   🔗 **JIRA-2451** • Status: Approved • Last sync: 2 hours ago

2. Emily Davis - Medical Leave Feb 3-4
   🔗 **JIRA-2448** • Status: In Review • Last sync: 5 hours ago

${
  role === "administrator" || role === "leader"
    ? `3. David Lee - Vacation Mar 15-21
   🔗 **JIRA-2445** • Status: Approved • Last sync: 1 day ago`
    : ""
}

**Integration status:** ✅ Active
**Last full sync:** ${new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleString()}
**Next scheduled sync:** In 6 hours

All Jira tickets are up to date with internal records.`,
      hasJiraLink: true,
    };
  }

  // Default response
  return {
    text: `Hello! I'm **Axet Gaia**, your AI assistant for administrative data.

I can help you with:

${
  role === "collaborator"
    ? `• View your vacation balance and consumption
• Track your vacation history
• Get recommendations on time off planning
• Check status of your requests`
    : role === "leader"
      ? `• Review pending approvals for your team
• Analyze team vacation patterns
• Identify team members with low balances
• Detect scheduling conflicts
• Generate team reports`
      : `• Access system-wide statistics
• Perform data validation across all users
• Generate comprehensive reports
• Manage Jira integrations
• Configure AI automation rules
• Monitor system health`
}

🔒 All responses are based on internal system data with role-based access control.

How can I assist you today?`,
  };
};

export default function AIChatAssistant({
  isOpen,
  onOpenChange,
}: AIChatAssistantProps) {
  const { user, role } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const userRole = role || "collaborator";
  const suggestedPrompts = getRolePrompts(userRole);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsTyping(true);
    setHasError(false);

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const response = getAIResponse(inputValue, userRole);
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.text,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        hasJiraLink: response.hasJiraLink,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleRetry = () => {
    setHasError(false);
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "user");
      if (lastUserMessage) {
        setInputValue(lastUserMessage.text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (message: Message) => {
    const content = message.text;

    // Parse markdown-style bold text
    const parts = content.split(/(\*\*.*?\*\*)/g);

    return (
      <div className="space-y-2">
        {parts.map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <span key={index} className="font-bold text-foreground">
                {part.slice(2, -2)}
              </span>
            );
          }

          // Split by newlines and render bullet points
          return part.split("\n").map((line, lineIndex) => {
            if (line.trim().startsWith("•")) {
              return (
                <div key={`${index}-${lineIndex}`} className="flex gap-2 ml-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{line.trim().slice(1).trim()}</span>
                </div>
              );
            }
            if (line.trim().startsWith("🔗")) {
              return (
                <div
                  key={`${index}-${lineIndex}`}
                  className="flex gap-2 items-center text-blue-600 font-mono text-sm"
                >
                  <LinkIcon className="h-3 w-3" />
                  <span>{line.trim().slice(2).trim()}</span>
                </div>
              );
            }
            if (line.trim()) {
              return <div key={`${index}-${lineIndex}`}>{line}</div>;
            }
            return null;
          });
        })}
      </div>
    );
  };

  if (!user) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[520px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b bg-linear-to-r from-purple-50 via-blue-50 to-cyan-50">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl bg-linear-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-xl">Axet Gaia</SheetTitle>
              <SheetDescription className="text-xs">
                AI Assistant • Role: {role?.charAt(0).toUpperCase()}
                {role?.slice(1)}
              </SheetDescription>
            </div>
            <Badge variant="outline" className="gap-1.5 bg-white shadow-sm">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Online
            </Badge>
          </div>
        </SheetHeader>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 py-4">
          {messages.length === 0 ? (
            // Empty State
            <div className="h-full flex flex-col items-center justify-center space-y-6 py-8">
              <div className="h-28 w-28 rounded-2xl bg-linear-to-br from-purple-100 via-blue-100 to-cyan-100 flex items-center justify-center">
                <Sparkles className="h-14 w-14 text-purple-600" />
              </div>

              <div className="text-center space-y-2 max-w-sm">
                <h3 className="font-bold text-xl">
                  Hello, {user?.email?.split(" ")[0] || "there"}!
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I'm Axet Gaia, your AI-powered assistant. I can help you
                  analyze data, validate information, generate insights, and
                  answer questions tailored to your role.
                </p>
              </div>

              <Separator />

              <div className="w-full space-y-3">
                <p className="text-xs font-medium text-muted-foreground text-center">
                  Suggested for you:
                </p>
                <div className="grid gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handlePromptClick(prompt.text)}
                      className="w-full justify-start text-left h-auto py-3 hover:bg-purple-50 hover:border-purple-200 transition-colors"
                    >
                      <span className="mr-2 text-base">{prompt.icon}</span>
                      <span className="text-sm">{prompt.text}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="bg-muted/50 rounded-lg p-3 w-full">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  🔒 Responses are based on internal system data with role-based
                  access control. All information is confidential and for
                  internal use only.
                </p>
              </div>
            </div>
          ) : (
            // Messages
            <div className="space-y-6 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      message.sender === "user"
                        ? "bg-blue-600"
                        : "bg-linear-to-br from-purple-600 via-blue-600 to-cyan-600"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`flex-1 ${message.sender === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    <Card
                      className={`max-w-[90%] p-4 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-card"
                      }`}
                    >
                      <div
                        className={`text-sm leading-relaxed ${
                          message.sender === "user"
                            ? "text-white"
                            : "text-foreground"
                        }`}
                      >
                        {renderMessageContent(message)}
                      </div>

                      {/* Inline Actions for AI Messages */}
                      {message.sender === "ai" &&
                        (message.text.includes("report") ||
                          message.hasJiraLink) && (
                          <div className="flex gap-2 mt-4 pt-3 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2 text-xs h-8 bg-white"
                            >
                              <FileText className="h-3 w-3" />
                              View Full Report
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2 text-xs h-8 bg-white"
                            >
                              <Download className="h-3 w-3" />
                              Export PDF
                            </Button>
                            {message.hasJiraLink && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 text-xs h-8 bg-white"
                              >
                                <LinkIcon className="h-3 w-3" />
                                Open in Jira
                              </Button>
                            )}
                          </div>
                        )}
                    </Card>

                    <span className="text-xs text-muted-foreground px-1">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-xl bg-linear-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center shadow-sm">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <Card className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-sm text-muted-foreground">
                        Axet Gaia is analyzing...
                      </span>
                    </div>
                  </Card>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <Card className="flex-1 p-4 border-red-200 bg-red-50">
                    <p className="text-sm text-red-900 mb-3">
                      Something went wrong. Please try again.
                    </p>
                    <Button
                      size="sm"
                      onClick={handleRetry}
                      variant="outline"
                      className="border-red-300 hover:bg-red-100"
                    >
                      Retry
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Footer */}
        <div className="border-t bg-muted/30 p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Axet Gaia anything..."
              className="flex-1 bg-background"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              size="icon"
              disabled={!inputValue.trim() || isTyping}
              className="shrink-0 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Powered by Axet Gaia AI
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
