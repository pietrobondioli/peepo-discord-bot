# Commands

## Notes

- The default prefix of the commands is `;`

## List of Available Commands

### **roll**

Roll command is basically a command that simulates a roll of one or multiple dices. The optional parameters for this command can be found in the end of this section.

**Roll one dice:**

---

`;roll d<n>`

Where \<n\> is the dice number.

Example:

`;roll d20` generates:

```txt
{user} Roll: [5] Result: 5
```

**Roll multiple dices:**

---

`;roll <m> d<n>`

Where \<n\> is the dice number and \<m\> is the number of dices.

Example:

`;roll 3 d20` generates:

```txt
{user} Rolls:
[7] Result: 7
[6] Result: 6
[12] Result: 12
```

**Roll multiple dices and sum the result:**

---

`;roll <m>d<n>`

Where \<n\> is the dice number and \<m\> is the number of dices.

Example:

`;roll 3d20` generates:

```txt
{user} Rolls: [20,1,13] Result: 34
```

**Optional arguments:**

---

**Additional operations:**

`;roll d<n><ops>`

`;roll <m> d<n><ops>`

`;roll <m>d<n><ops>`

Where \<ops\> means operations.
You can put any math operation right after the dice number (\<n\>) argument.

Examples:

`;roll d20 +4` generates:

```txt
{user} Roll: [13] Result: 17
```

`;roll 3 d20 +4` generates:

```txt
{user} Rolls:
[10] Result: 14
[20] Result: 24
[2] Result: 6
```

`;roll 3d20 +4` generates:

```txt
{user} Rolls: [9,1,1] Result: 15
```

**Private rolls:**

`;roll d<n> -p [me] <users>`

`;roll <m> d{n> -p [me] <users>`

`;roll <m>d{n> -p [me] <users>`

Where {users} are a list of quoted users separated by a white space and [me] is just a optional string with the content 'me'.
This arg allows you to tell the bot that you want the command response to be sent in your/quoted users private chat instead of sending it on server channel.

Examples:

`;roll 3 d20 +4 -p @some_user` generates:

```txt
Command: ;roll 3 d20 +4 -p @some_user

{user} Rolls:
[17] Result: 21
[12] Result: 16
[2] Result: 6
```

The above message will be sent to: the private's chat of @some_user. If you don't pass the 'me' arg the user who sent the command will not receive the response message.

`;roll 3 d20 +4 -p me @some_user` generates:

```txt
Command: ;roll 3 d20 +4 -p me @some_user

{user} Rolls:
[17] Result: 21
[12] Result: 16
[2] Result: 6
```

The above message will be sent to: the private's chat of the user who issued the command and of @some_user.

Note that you can use the two optional parameters together with no problems as long as you don't try to invert the order of them, like: `roll 3 d20 -p me @some_user +4` (it won't work).

### **calc**

With calc command you can perform any math operation.

`;calc <expression>`

Where \<expression\> is a math expression that will be resolved.

### **translate**

Translate command use google translator api to translate any input to any language.

`;translate -<lang> <text>`

Where \<lang\> is the language the text will be translated into, and text is the text that will be translated.

### **weather**

It uses the OpenWeather api to get info about current weather.

`;weather <cityName>`

Where \<cityName\> is the name of the city from which the info about the weather will be get.

### **yomomma**

Displays a joke about your mom.

`;yomomma -<lang>`

Where \<lang\> is an optional parameter that can be passed if you want the joke to be translated.
